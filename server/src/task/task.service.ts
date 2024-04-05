import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/category/entities/category.entity'
import { History } from 'src/history/entities/history.entity'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './entities/task.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = {
      title: createTaskDto.title,
      priority: createTaskDto.priority,
      duedate: createTaskDto.duedate,
      description: createTaskDto.description,
      category: { id: +createTaskDto.category }
    }

    const newLog = {
      actionId: 2,
      oldCategoryName: createTaskDto.categoryName,
      newCategoryName: '',
      oldTaskName: '',
      newTaskName: createTaskDto.title,
      categoryId: +createTaskDto.category,
      taskId: 0
    }

    if (!newTask || !newLog)
      throw new BadRequestException('Something went wrong...')

    this.historyRepository.save(newLog)

    return await this.taskRepository.save(newTask)
  }

  async findAll() {
    const tasks = await this.taskRepository.find({
      relations: {
        category: true
      },
      order: {
        createdAt: 'DESC'
      }
    })
    return tasks
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        category: true
      }
    })
    if (!task) throw new NotFoundException('Task not found!')
    return task
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['category']
    })
    if (!task) throw new NotFoundException('Task not found to update!')

    if (updateTaskDto.category.id !== task.category.id) {
      const newCategory = await this.categoryRepository.findOne({
        where: { id: updateTaskDto.category.id }
      })
      if (!newCategory) {
        throw new NotFoundException('New category not found!')
      }

      const newLog = {
        actionId: 3,
        oldCategoryName: task.category.title,
        newCategoryName: newCategory.title,
        newTaskName: '',
        oldTaskName: task.title,
        // categoryId: 0,
        taskId: task.id
      }
      if (!newLog) throw new BadRequestException('Something went wrong...')

      await this.historyRepository.save(newLog)
    }

    await this.taskRepository.update(id, updateTaskDto)

    return { message: `Task ${id} has been updated` }
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        category: true
      }
    })
    if (!task) throw new NotFoundException('Task not found to delete!')

    const newLog = {
      actionId: 6,
      oldCategoryName: task.category.title,
      newCategoryName: '',
      newTaskName: '',
      oldTaskName: task.title,
      // categoryId: 0,
      taskId: task.id
    }
    if (!newLog) throw new BadRequestException('Something went wrong...')

    await this.historyRepository.save(newLog)
    const result = await this.taskRepository.delete(id)

    return { ...result, message: `Task with id=${id} has been removed` }
  }
}
