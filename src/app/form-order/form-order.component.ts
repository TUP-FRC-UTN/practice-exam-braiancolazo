import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-order',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.css'
})
export class FormOrderComponent implements OnInit,OnDestroy {
  router = inject(Router)
  subscription = new Subscription();
  lstProduct:Product[]=[]

  form = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.minLength(3)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    productos: new UntypedFormArray([])
  })

  

  serviceOrder = inject(OrderService);
  serviceProduct = inject(ProductService)
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.serviceProduct.getAll().subscribe({
      next:(value:Product[]) =>{
        this.lstProduct = value
      }

    })
  }

  get productos(){
    return this.form.controls['productos'] as UntypedFormArray
  }

  onNewProduct(){
    const formArray = this.form.controls["productos"] as UntypedFormArray;
    const productForm = new UntypedFormGroup({
      producto: new UntypedFormControl('', []),
      cantidad: new UntypedFormControl(0, []),
      precio: new UntypedFormControl(0, []),
      stock: new UntypedFormControl(0, [])
    });
    formArray.push(productForm);
  }


  onDeleteProduct(index: number) {
    this.productos.removeAt(index);
  }
  save() {
    if (this.form.invalid) {
      alert("Formulario invalido");
      console.log(this.form)
      return;
    }
  
    const order:Order = {
      id: '0',
      customerName: this.form.controls['nombre'].value ?? '',
      email: this.form.controls['email'].value ?? '',
      products:this.form.controls['productos'].value,
      total: this.form.controls['productos'].get('precio')?.value,
      orderCode: 'pepe',
      timestamp: new Date(),
    }
    
  
    const addSubscription = this.serviceOrder.add(order).subscribe({
      next: () => {
        this.router.navigate(['list']);
      },
      error: (err) => {
        alert('Error al comunicarse con la API')
      }
    });
    this.subscription.add(addSubscription);
  }



}
