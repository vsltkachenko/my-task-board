import { Injectable } from '@nestjs/common'
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
        createdAt: 'ASC'
      }
    })
    return logs
  }

  async removeAll() {
    await this.historyRepository.delete({})
    return 'All history records have been removed'
  }
}
