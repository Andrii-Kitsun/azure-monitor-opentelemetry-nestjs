import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { LoggerService } from '../../core/modules';

@Injectable()
export class CatsService {
  constructor(private readonly loggerService: LoggerService) {}

  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  findAll() {
    this.loggerService.exceptionSpan(new Error('It will be logged'));

    return `This action returns all cats`;
  }

  findOne(id: number) {
    this.loggerService.exceptionActiveSpan(new Error('It will not be logged'));

    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
