import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './Dto/createOrders.dto';
export declare class OrdersController {
    private readonly orderService;
    constructor(orderService: OrdersService);
    addOrder(order: CreateOrderDTO): Promise<"No hay productos disponibles con stock" | {
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
