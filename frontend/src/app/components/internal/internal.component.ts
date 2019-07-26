import { Component, OnInit } from '@angular/core';
import { InternalService } from 'src/app/services/internal.service';
import { NgForm } from '@angular/forms';
import { Internal } from 'src/app/models/internal';
declare var M: any;

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.css']
})
export class InternalComponent implements OnInit {
  filterInternal = '';
  p: number = 1;

  constructor(public internalService: InternalService) { } //Cambiar despues a private

  ngOnInit() {
    this.findAll();
  }

  addInternal(form: NgForm) {
    if (form.value._id) {
      this.internalService.putInternal(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Update successfully!', classes: 'rounded' });
          this.findAll();
        })
    } else {
      this.internalService.postInternal(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Saved successfully!', classes: 'rounded' });
          this.findAll();
        });
    }
  }

  findAll() {
    this.internalService.findAll()
      .subscribe(res => {
        this.internalService.allInternal = res as Internal[];
        console.log(res);
      });
  }

  editInternal(internal: Internal) {
    this.internalService.selectedInternal = internal;
  }

  deleteInternal(_id: string) {
    if (confirm('Are you sure want to delete it?')) {
      this.internalService.deleteInternal(_id)
        .subscribe(res => {
          this.findAll();
          M.toast({ html: 'Deleted successfully!', classes: 'rounded' })
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.internalService.selectedInternal = new Internal();
    }
  }

  getTotalAmount() {
    return this.internalService.allInternal.map(i => i.amount).reduce((acc, value) => acc + value, 0);
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
