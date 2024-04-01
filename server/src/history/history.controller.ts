import { Controller, Get, Post, Body, Delete } from '@nestjs/common'
import { HistoryService } from './history.service'
import { CreateHistoryDto } from './dto/create-history.dto'

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  // @Post()
  // create(@Body() createHistoryDto: CreateHistoryDto) {
  //   return this.historyService.create(createHistoryDto)
  // }

  @Get()
  findAll() {
    return this.historyService.findAll()
  }

  @Delete()
  removeAll() {
    return this.historyService.removeAll()
  }
}
