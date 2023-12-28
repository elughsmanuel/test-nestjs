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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './models/product.entity';

@Controller('api/products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() product: Product): Promise<Product> {
        const createdProduct = await this.productService.create(product);
        return createdProduct;
    }

    @Get()
    async findAll(): Promise<Product[]> {
        const products = await this.productService.findAll();

        return products;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
        const product = await this.productService.findOne(id);

        if (!product) {
            throw new NotFoundException('Product not found!');
        }

        return product;
    }

    @Put(':id')
    async update (@Param('id') id: number, @Body() product: Product): Promise<any> {
        product = await this.productService.update(id, product);

        if (!product) {
            throw new NotFoundException('Product not found!');
        }

        return product;
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        const product = await this.productService.findOne(id);
    
        if (!product) {
            throw new NotFoundException('Product does not exist!');
        }
    
        await this.productService.delete(id);
        return { message: 'Product deleted successfully' };
    }
}
