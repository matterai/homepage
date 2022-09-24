import { ApiProperty } from '@nestjs/swagger';

export class AddEvmUserDto {
  @ApiProperty()
  address: string;
}
