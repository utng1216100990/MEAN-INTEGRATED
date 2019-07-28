import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { NgForm } from '@angular/forms';
import { Order } from 'src/app/models/order';
declare var M: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  p: number = 1;

  constructor(public orderService: OrderService) { }

  ngOnInit() {
    this.findAll();
  }

  addOrder(form: NgForm) {
    if (form.value._id) {
      this.orderService.putOrder(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Update successfully!', classes: 'rounded' });
          this.findAllOrders();
        })
    } else {
      this.orderService.postOrder(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Saved successfully!', classes: 'rounded' });
          this.findAllOrders();
        });
    }
  }

  findAll() {
    this.orderService.findAll()
      .subscribe(res => {
        this.orderService.orders = res as Order[];
        console.log(res);
      });
  }

  findAllOrders() {
    this.orderService.findAllOrders()
      .subscribe(res => {
        this.orderService.orders = res as Order[];
        console.log(res);
      });
  }

  editOrder(order: Order) {
    this.orderService.selectedOrder = order;
  }

  deleteOrder(_id: string) {
    if (confirm('Are you sure want to delete it?')) {
      this.orderService.deleteOrder(_id)
        .subscribe(res => {
          this.findAllOrders();
          M.toast({ html: 'Deleted successfully!', classes: 'rounded' })
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.orderService.selectedOrder = new Order();
    }
  }

}
