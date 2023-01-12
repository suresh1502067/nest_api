
import { IsEmpty, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthuserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
