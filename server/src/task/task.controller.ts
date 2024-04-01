import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskService } from './task.service'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // tasks/pagination?page=1&limit=3
  // @Get('pagination')
  // findWhithPagination(
  //   @Query('page') page: number = 1,
  //   @Query('limit') limit: number = 3
  // ) {
  //   return this.taskService.findWithPagination(+page, +limit)
  // }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto)
  }

  @Get()
  findAll() {
    return this.taskService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id)
  }
}
