import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @IsEmail()
  @ApiProperty({ description: 'User e-mail' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Displaying name of user' })
  displayName: string;
}
