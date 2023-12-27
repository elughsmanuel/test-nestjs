import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/models/product.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],

            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get('DATABASE_URL'),
                entities: [Product],
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
