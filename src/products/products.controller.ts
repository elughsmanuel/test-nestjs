import { 
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.entity';

@Controller('api/v1/products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() product: Product): Promise<Product> {
        const createdProduct = await this.productService.create(product);
        return createdProduct;
    }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Product[]> {
        const products = await this.productService.findAll();

        return products;
    }

    @Get('/get-product/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: number): Promise<Product> {
        const product = await this.productService.findOne(id);

        if (!product) {
            throw new NotFoundException('Product not found!');
        }

        return product;
    }

    @Put('/update-product/:id')
    @HttpCode(HttpStatus.OK)
    async update (@Param('id') id: number, @Body() product: Product): Promise<any> {
        product = await this.productService.update(id, product);

        if (!product) {
            throw new NotFoundException('Product not found!');
        }

        return product;
    }
  
    @Delete('/delete-product/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: number): Promise<any> {
        const product = await this.productService.findOne(id);
    
        if (!product) {
            throw new NotFoundException('Product does not exist!');
        }
    
        await this.productService.delete(id);
        return { message: 'Product deleted successfully' };
    }
}
