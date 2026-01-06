/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '4bc53532-a168-4591-9a43-0ab4d1d0c241',
    description: 'El ID del usuario que realiza el pedido en formato UUID',
  })
  idUser: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    example: [
      { id: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6' },
      { id: '6p5o4n3m-2l1k0j-9i8h-7g6f-5e4d3c2b1a0' },
    ],
    description:
      'Lista de productos incluidos en el pedido, cada uno identificado por su ID en formato UUID',
  })
  products: { id: string }[];
}
