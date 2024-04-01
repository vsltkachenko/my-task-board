import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './entities/task.entity'
import { History } from 'src/history/entities/history.entity'
import { Category } from 'src/category/entities/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([History]),
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
