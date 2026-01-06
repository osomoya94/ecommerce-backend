/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class createUser {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({
    example: 'isAdmin',
    description: 'Nombre completo del usuario',
  })
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'isAdmin@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  email!: string;

  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, incluir minúscula, mayúscula, número y un carácter especial (!@#$%^&*)',
  })
  @ApiProperty({
    example: 'P@ssw0rd!',
    description:
      'La contraseña debe tener entre 8 y 15 caracteres, incluir minúscula, mayúscula, número y un carácter especial (!@#$%^&*)',
  })
  password!: string;

  @IsString()
  @Length(3, 80)
  @ApiProperty({
    example: 'Calle Falsa 123',
    description: 'Dirección del usuario',
  })
  address!: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    example: 123456781,
    description: 'Número de teléfono del usuario',
  })
  phone!: number;

  @IsString()
  @Length(5, 20)
  @ApiProperty({
    example: 'Argentina',
    description: 'País del usuario',
  })
  country!: string;

  @IsString()
  @Length(5, 20)
  @ApiProperty({
    example: 'Buenos Aires',
    description: 'Ciudad del usuario',
  })
  city!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    example: 'P@ssw0rd!',
    description:
      'La contraseña debe tener entre 8 y 15 caracteres, incluir minúscula, mayúscula, número y un carácter especial (!@#$%^&*)',
  })
  confirmPassword!: string;

  @IsBoolean()
  @Exclude()
  @ApiProperty({
    default: false,
  })
  isAdmin?: boolean = false;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '1990-01-01',
    description: 'Fecha de nacimiento del usuario',
  })
  birthdate: string;
}

export class updateUser {
  @IsString()
  @IsOptional()
  @Length(3, 80)
  @ApiProperty({
    example: 'isAdmin',
    description: 'Nombre completo del usuario',
  })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'isAdmin@gmail.com',
    description: 'Correo electrónico del usuario',
  })
  email?: string;

  @IsOptional()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
  @ApiProperty({
    example: 'P@ssw0rd!',
    description:
      'La contraseña debe tener entre 8 y 15 caracteres, incluir minúscula, mayúscula, número y un carácter especial (!@#$%^&*)',
  })
  password?: string;

  @IsString()
  @IsOptional()
  @Length(3, 80)
  @ApiProperty({
    example: 'Calle Falsa 123',
    description: 'Dirección del usuario',
  })
  address?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    example: 12345678,
    description: 'Número de teléfono del usuario',
  })
  phone?: number;

  @IsString()
  @IsOptional()
  @Length(5, 20)
  @ApiProperty({
    example: 'Argentina',
    description: 'País del usuario',
  })
  country?: string;

  @IsString()
  @IsOptional()
  @Length(5, 20)
  @ApiProperty({
    example: 'Buenos Aires',
    description: 'Ciudad del usuario',
  })
  city?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false,
    description: 'Indica si el usuario es administrador',
  })
  isAdmin?: boolean;
}
