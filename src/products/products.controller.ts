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
}
