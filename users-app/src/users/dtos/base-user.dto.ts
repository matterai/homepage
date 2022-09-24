import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty({ description: 'Unique identifier of user' })
  id: string;
}
