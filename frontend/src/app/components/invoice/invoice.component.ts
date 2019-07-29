import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NgForm } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice';
declare var M: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  p: number = 1;

  constructor(public invoiceService: InvoiceService) { }

  ngOnInit() {
    this.findAll();
  }

  addInvoice(form: NgForm) {
    if (form.value._id) {
      this.invoiceService.putInvoice(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Update successfully!', classes: 'rounded' });
          this.findAll();
        })
    } else {
      this.invoiceService.postInvoice(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Saved successfully!', classes: 'rounded' });
          this.findAll();
        });
    }
  }

  findAll() {
    this.invoiceService.findAll()
      .subscribe(res => {
        this.invoiceService.invoices = res as Invoice[];
        console.log(res);
      });
  }

  editInvoice(invoice: Invoice) {
    this.invoiceService.selectedInvoice = invoice;
  }

  deleteInvoice(_id: string) {
    if (confirm('Are you sure want to delete it?')) {
      this.invoiceService.deleteInvoice(_id)
        .subscribe(res => {
          this.findAll();
          M.toast({ html: 'Deleted successfully!', classes: 'rounded' })
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.invoiceService.selectedInvoice = new Invoice();
    }
  }

}
