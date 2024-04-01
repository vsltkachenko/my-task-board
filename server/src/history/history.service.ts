import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateHistoryDto } from './dto/create-history.dto'
import { UpdateHistoryDto } from './dto/update-history.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { History } from './entities/history.entity'

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>
  ) {}

  async findAll() {
    const logs = await this.historyRepository.find({
      order: {
        createdAt: 'DESC'
      }
    })
    return logs
  }
  
  async removeAll() {
    await this.historyRepository.delete({})
    return 'All history records have been removed'
  }
}
