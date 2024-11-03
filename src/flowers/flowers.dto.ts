import { IsNumber, IsString } from 'class-validator';

export class CreateFlowersDto {
  @IsString({
    message: 'Name is not striung',
  })
  name: string;

  @IsString()
  color: string;

  @IsNumber()
  price: number;
}

export type TUpdateFlowersDto = Partial<CreateFlowersDto>;
