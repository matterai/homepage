import { ApiProperty } from '@nestjs/swagger';

export class GetEvmUser {
  @ApiProperty()
  address: string;
}
