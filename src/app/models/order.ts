import { Orderproduct } from "./orderproduct";

export interface Order {
    id: string;
    customerName:string;
    email: string;
    products:Orderproduct[];
    total: number
    orderCode: string
    timestamp: Date;
}
