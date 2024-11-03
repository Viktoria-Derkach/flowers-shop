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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('flowers')
@ApiTags('Flowers')
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}
  @Get('')
  // @UseGuards(AuthGuard)
  findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
    console.log(pageNumber);

    return this.flowersService.findAll();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  // @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: 'res suc',
  })
  @ApiBody({
    type: CreateFlowersDto,
    description: 'deess',
  })
  create(@Body() dto: CreateFlowersDto) {
    return this.flowersService.create(dto);
  }
}
