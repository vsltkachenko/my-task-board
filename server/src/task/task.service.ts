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
      oldCategoryName: createTaskDto.currentCategoryName,
      newCategoryName: createTaskDto.currentCategoryName,
      newTaskName: createTaskDto.title,
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

    const newCategoryId = updateTaskDto.category as unknown
    const oldCategoryId = task.category.id

    // =============== Task moved =========== //
    if (newCategoryId !== oldCategoryId) {
      const newCategory = await this.categoryRepository.findOne({
        where: { id: newCategoryId as number }
      })
      if (!newCategory) {
        throw new NotFoundException('New category not found!')
      }

      const newLog = {
        actionId: 3,
        oldCategoryName: task.category.title,
        newCategoryName: newCategory.title,
        oldTaskName: task.title,
        taskId: task.id
      }
      if (!newLog) throw new BadRequestException('Something went wrong...')
      await this.historyRepository.save(newLog)
    }

    // =============== Task rename =========== //
    if (task.title !== updateTaskDto.title) {
      const newLog = {
        actionId: 7,
        oldCategoryName: task.category.title,
        newTaskName: updateTaskDto.title,
        oldTaskName: task.title,
        taskId: task.id
      }
      if (!newLog) throw new BadRequestException('Something went wrong...')
      await this.historyRepository.save(newLog)
    }

    // =============== Change task status =========== //
    if (task.priority !== updateTaskDto.priority) {
      const newLog = {
        actionId: 8,
        oldTaskName: task.title,
        oldPriority: task.priority,
        newPriority: updateTaskDto.priority,
        taskId: task.id
      }
      if (!newLog) throw new BadRequestException('Something went wrong...')
      await this.historyRepository.save(newLog)
    }

    // =============== Change due date =========== //
    if (task.duedate !== updateTaskDto.duedate) {
      const newLog = {
        actionId: 9,
        oldTaskName: task.title,
        oldDuedate: task.duedate,
        newDuedate: updateTaskDto.duedate,
        taskId: task.id
      }
      if (!newLog) throw new BadRequestException('Something went wrong...')
      await this.historyRepository.save(newLog)
    }

    // =============== Change description =========== //
    if (task.description !== updateTaskDto.description) {
      const newLog = {
        actionId: 10,
        oldTaskName: task.title,
        oldDescription: task.description,
        newDescription: updateTaskDto.description,
        taskId: task.id
      }
      if (!newLog) throw new BadRequestException('Something went wrong...')
      await this.historyRepository.save(newLog)
    }

    const { currentCategoryName, ...rest } = updateTaskDto
    await this.taskRepository.update(id, rest)
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
