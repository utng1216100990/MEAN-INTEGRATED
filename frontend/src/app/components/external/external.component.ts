import { Component, OnInit } from '@angular/core';
import { ExternalService } from 'src/app/services/external.service';
import { NgForm } from '@angular/forms';
import { External } from 'src/app/models/external';
declare var M: any;

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css']
})
export class ExternalComponent implements OnInit {
  filterExternal = '';
  p: number = 1;

  constructor(public externalService: ExternalService) { }

  ngOnInit() {
    this.findAll();
  }

  addExternal(form: NgForm) {
    if (form.value._id) {
      this.externalService.putExternal(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Update successfully!', classes: 'rounded' });
          this.findAll();
        })
    } else {
      this.externalService.postExternal(form.value)
        .subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Saved successfully!', classes: 'rounded' });
          this.findAll();
        });
    }
  }

  findAll() {
    this.externalService.findAll()
      .subscribe(res => {
        this.externalService.allExternal = res as External[];
        console.log(res);
      });
  }

  editExternal(external: External) {
    this.externalService.selectedExternal = external;
  }

  deleteExternal(_id: string) {
    if (confirm('Are you sure want to delete it?')) {
      this.externalService.deleteExternal(_id)
        .subscribe(res => {
          this.findAll();
          M.toast({ html: 'Deleted successfully!', classes: 'rounded' })
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.externalService.selectedExternal = new External();
    }
  }

  getTotalCost() {
    return this.externalService.allExternal.map(i => i.cost).reduce((acc, value) => acc + value, 0);
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

}
