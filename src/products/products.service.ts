import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async create(product: Partial<Product>): Promise<Product> {
        const newProduct = this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }
}
