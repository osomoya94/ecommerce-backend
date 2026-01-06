import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.entitys';
import { OrderDetail } from 'src/orderDetails/orderDetails.entyties';
export declare class OrderRepository {
    private readonly orderRepository;
    private readonly productRepository;
    private readonly userRepositoryMetodo;
    private readonly userRepository;
    constructor(orderRepository: Repository<Order>, productRepository: Repository<Product>, userRepositoryMetodo: UsersRepository, userRepository: Repository<User>);
    addOrder(idUser: string, products: {
        id: string;
    }[]): Promise<"No hay productos disponibles con stock" | {
        message: string;
        orderId: string;
        total: number;
    }>;
    getOrder(id: string): Promise<"Orden no encontrada" | {
        id: string;
        date: Date;
        total: number;
        user: {
            id: string;
            name: string;
            email: string;
        };
        details: OrderDetail;
    }>;
}
