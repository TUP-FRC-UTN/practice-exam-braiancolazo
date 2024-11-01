import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent implements OnInit{
  lstOrders:Order[] = []
  form = new FormGroup({
    filtro:new FormControl('',[])
  })
 
  

  serviceOrder = inject(OrderService)

  ngOnInit(): void {
    this.serviceOrder.getAll().subscribe({
      next:(value:Order[]) =>{
        this.lstOrders = value
      }

    })
    this.form.get('filtro')?.valueChanges.subscribe(value => {
      if(value === null || value === '') {
        return this.getOrders()
      }
      this.lstOrders = this.lstOrders.filter(
        p => p.customerName.toUpperCase().includes(value.toUpperCase()) || p.email.toUpperCase().includes(value.toUpperCase()))
    })


    
  }
  getOrders() {
    // this.progService.get().subscribe({
    //   next: (data : Programador[]) => this.lstProgramadores = data,
    //   error : (err) => console.log(err),
    //   complete : () => console.log("complete")
    // })
    
    this.serviceOrder.getAll().subscribe( (data : Order [] ) => {
    this.lstOrders = data
    });

  }


}
