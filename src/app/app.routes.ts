import { Routes } from '@angular/router';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { FormOrderComponent } from './form-order/form-order.component';

export const routes: Routes = [
    
    {
        path:"new",component:FormOrderComponent
    },
    {
        path: "**",component:ListOrdersComponent
    }
];
