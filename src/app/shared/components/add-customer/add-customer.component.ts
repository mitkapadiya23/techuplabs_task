import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { CustomerService } from '../../services/customer.service';
import { Region } from '../../modals/customer.modal';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-add-customer',
  imports: [CommonModule, ReactiveFormsModule, NgxSelectModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private customerService = inject(CustomerService);
  private localstorageService = inject(LocalstorageService);

  activeModal = inject(NgbActiveModal);

  allRegionData: Region[] = [];
  regions: string[] = [];
  countries: string[] = [];

  form: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    region: ['', Validators.required],
    country: ['', Validators.required],
  });

  ngOnInit(): void {
    this.customerService.getRegions().subscribe({
      next: (res) => {
        console.log({ res });
        Object.values(res.data).forEach((res: any) => {
          this.allRegionData.push(res);
          if (!this.regions.includes(res.region)) {
            this.regions.push(res.region);
          }
        });
      },
      error: (err) => {
        console.error({ err });
      },
    });
  }

  onRegionSelected(event: string) {
    this.countries = this.allRegionData
      .filter((ele) => ele.region == event)
      .map((r) => r.country);
    console.log({ event });
  }

  saveCustomer() {
    this.markFormGroupTouchedAndDirty(this.form);
    if (this.form.invalid) {
      console.log(this.form);

      return;
    }

    const customers = this.localstorageService.getValue('customers');
    customers.push(this.form.value);
    this.localstorageService.setValue('customers', customers);
    this.activeModal.close('submitted');
  }

  private markFormGroupTouchedAndDirty(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      control.markAsDirty();

      if (control.controls) {
        this.markFormGroupTouchedAndDirty(control);
      }
    });
  }
}
