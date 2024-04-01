import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { History } from 'src/history/entities/history.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isExist = await this.categoryRepository.findOneBy({
      title: createCategoryDto.title
    })

    if (isExist) throw new BadRequestException('This category already exist!')
    const newCategory = { title: createCategoryDto.title }

    const newLog = {
      actionId: 1,
      newCategoryName: newCategory.title,
      oldCategoryName: '',
      newTaskName: '',
      oldTaskName: '',
      categoryId: 0,
      taskId: 0
    }

    if (!newLog) throw new BadRequestException('Something went wrong...')
    await this.historyRepository.save(newLog)

    return await this.categoryRepository.save(newCategory)
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: {
        tasks: true
      }
      // order: {
      //   createdAt: 'DESC'
      // }
    })
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        tasks: true
      }
    })
    if (!category) throw new NotFoundException('Category not found!')
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id }
    })
    if (!category) throw new NotFoundException('Category not found to update!')

    const newLog = {
      actionId: 5,
      oldCategoryName: category.title,
      newCategoryName: updateCategoryDto.title,
      oldTaskName: '',
      newTaskName: '',
      categoryId: category.id,
      taskId: 0
    }

    if (!newLog) throw new BadRequestException('Something went wrong...')
    await this.historyRepository.save(newLog)

    const result = await this.categoryRepository.update(id, updateCategoryDto)
    return { ...result, message: `Category ${id} has been updated` }
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id }
    })
    if (!category) throw new NotFoundException('Category not found to delete!')

    const newLog = {
      actionId: 4,
      oldCategoryName: category.title,
      newCategoryName: '',
      oldTaskName: '',
      newTaskName: '',
      categoryId: category.id,
      taskId: 0
    }

    if (!newLog) throw new BadRequestException('Something went wrong...')
    await this.historyRepository.save(newLog)

    const result = await this.categoryRepository.delete(id)
    return { ...result, message: `Category id=${id} has been removed` }
  }
}
