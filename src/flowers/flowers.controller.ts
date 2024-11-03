import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { ParseIntPipe } from '../conception/pipe';
import { AuthGuard } from '../conception/guard';
import { LoggingInterceptor } from '../conception/interceptor';
import { CreateFlowersDto } from './flowers.dto';

@Controller('flowers')
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}
  @Get('')
  @UseGuards(AuthGuard)
  findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
    console.log(pageNumber);

    return this.flowersService.findAll();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateFlowersDto) {
    return this.flowersService.create(dto);
  }

}
