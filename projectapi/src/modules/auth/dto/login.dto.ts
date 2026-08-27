import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin_pusat', description: 'Username atau email pengguna' })
  @IsNotEmpty({ message: 'Username / email tidak boleh kosong' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'MbgAdmin2026!', description: 'Kata sandi akun' })
  @IsNotEmpty({ message: 'Kata sandi tidak boleh kosong' })
  @IsString()
  @MinLength(6, { message: 'Kata sandi minimal 6 karakter' })
  password: string;
}
