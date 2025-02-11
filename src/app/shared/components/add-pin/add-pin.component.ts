import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalstorageService } from '../../services/localstorage.service';
import { CustomerService } from '../../services/customer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'app-add-pin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FileUploadModule,
  ],
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.scss',
})
export class AddPinComponent {
  private formBuilder = inject(FormBuilder);
  private localstorageService = inject(LocalstorageService);

  activeModal = inject(NgbActiveModal);

  uploader!: FileUploader;
  hasBaseDropZone = false;
  storedImages: string[] = [];
  file!: any;
  allowedMimeTypes: string[] = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/bmp',
  ];

  customers = this.localstorageService
    .getValue('customers')
    .map((ele: any) => ele.title);

  form: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    file: ['', Validators.required],
    collaborators: ['', Validators.required],
    privacy: ['', Validators.required],
  });

  ngOnInit(): void {
    this.uploader = new FileUploader({
      disableMultipart: true,
      autoUpload: false,
      url: '',
      allowedMimeType: this.allowedMimeTypes,
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZone = e;
  }

  async onFileSelected(event: any) {
    if (!this.allowedMimeTypes.includes(event[0].type)) {
      this.form.get('file')?.markAsDirty();
      this.form.get('file')?.markAsTouched();
      this.form.get('file')?.updateValueAndValidity();
      return;
    }
    this.file = (await this.blobToBase64(event[0])) ?? '';
    this.form.patchValue({ file: this.file });
  }

  savePin() {
    this.markFormGroupTouchedAndDirty(this.form);
    if (this.form.invalid) {
      return;
    }

    let pins = this.localstorageService.getValue('pins');
    pins.push(this.form.value);
    this.localstorageService.setValue('pins', pins);
    this.activeModal.close('submitted');
  }

  removeFile() {
    this.form.get('file')?.reset();
    this.file = null;
  }

  private blobToBase64(blob: any) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
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
