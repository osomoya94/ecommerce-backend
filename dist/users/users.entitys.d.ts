import { Order } from 'src/orders/orders.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    city: string;
    address: string;
    confirmPassword: string;
    isAdmin: boolean;
    birthdate: Date;
    orders: Order[];
}
