import { Category } from 'src/categories/categories.entityes';
import { OrderDetail } from 'src/orderDetails/orderDetails.entyties';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: Category;
    orderDetails: OrderDetail[];
}
