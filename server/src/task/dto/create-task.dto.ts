import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Category } from 'src/category/entities/category.entity'

export class CreateTaskDto {
  @IsNotEmpty()
  title: string

  @IsString()
  duedate: string

  @IsString()
  priority: 'Medium' | 'Low' | 'High'

  @IsString()
  description: string

  @IsNotEmpty()
  category: Category

  @IsString()
  categoryName: string
}
