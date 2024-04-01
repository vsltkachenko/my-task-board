import { IsNumber, IsString } from 'class-validator'

export class CreateHistoryDto {
  @IsNumber()
  actionId: number = 0

  @IsString()
  oldCategoryName: string = ''

  @IsString()
  newCategoryName: string = ''

  @IsString()
  oldTaskName: string = ''

  @IsString()
  newTaskName: string = ''

  @IsNumber()
  categoryId: number = 0

  @IsNumber()
  taskId: number = 0
}
