import { OrderDetail } from 'src/orderDetails/orderDetails.entyties';
import { User } from 'src/users/users.entitys';
export declare class Order {
    id: string;
    date: Date;
    total: number;
    details: OrderDetail;
    user: User;
}
