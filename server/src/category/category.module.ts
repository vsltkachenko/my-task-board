import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { History } from 'src/history/entities/history.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([History])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
