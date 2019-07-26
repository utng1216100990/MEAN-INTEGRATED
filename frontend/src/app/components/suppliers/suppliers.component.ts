import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { NgForm } from '@angular/forms';
import { Supplier } from 'src/app/models/supplier';
declare var M: any;

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
  providers: [SupplierService]
})
export class SuppliersComponent implements OnInit {
  filterSupplier = '';
  p: number = 1;

  constructor(public supplierService: SupplierService) { } //Cambiar despues a private

  ngOnInit() {
    this.getSuppliers();
  }

  addSupplier(form: NgForm) {
    if (form.value._id) {
      this.supplierService.putSupplier(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Updated successfully!', classes: 'rounded' });
          this.getSuppliers();
        });
    } else {
      this.supplierService.postSupplier(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Saved successfully!', classes: 'rounded' });
          this.getSuppliers();
        });
    }
  }

  getSuppliers() {
    this.supplierService.getSuppliers()
      .subscribe(res => {
        this.supplierService.suppliers = res as Supplier[];
        console.log(res);
      })
  }

  editSupplier(supplier: Supplier) {
    this.supplierService.selectedSupplier = supplier;
  }

  deleteSupplier(_id: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.supplierService.deleteSupplier(_id)
        .subscribe(res => {
          this.getSuppliers();
          M.toast({ html: 'Deleted successfully!', classes: 'rounded' })
        })
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.supplierService.selectedSupplier = new Supplier();
    }
  }

  /* Tabs */
  step = 0;
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}//End class
