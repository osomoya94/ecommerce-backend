/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class createProductsDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  @ApiProperty({ description: 'Product name', example: 'Laptop' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product description',
    example: 'A high-end laptop',
  })
  description: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'Product price', example: 1500 })
  price: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'Product stock', example: 50 })
  stock: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Product image URL',
    example: 'http://image.url',
  })
  imgUrl: string;
}

export class updateProduct {
  @IsString()
  @IsOptional()
  @Length(3, 80)
  @ApiProperty({ description: 'Product name', example: 'Laptop' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product description',
    example: 'A high-end laptop',
  })
  description: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'Product price', example: 1500 })
  price: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'Product stock', example: 50 })
  stock: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product image URL',
    example: 'http://image.url',
  })
  imgUrl: string;
}
