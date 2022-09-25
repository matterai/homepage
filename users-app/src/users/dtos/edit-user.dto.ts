import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class EditUserDto extends BaseUserDto {
  @ApiProperty({ description: 'Main user email' })
  email: string;

  @ApiProperty({ description: 'Displaying name' })
  displayName: string;
}
