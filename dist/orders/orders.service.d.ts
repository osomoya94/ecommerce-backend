import { OrderRepository } from './orders.repository';
export declare class OrdersService {
    private readonly orderRepository;
    constructor(orderRepository: OrderRepository);
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
        details: import("../orderDetails/orderDetails.entyties").OrderDetail;
    }>;
}
