import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Country } from '../../shared/modals/pin.modal';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AddPinComponent } from '../../shared/components/add-pin/add-pin.component';
import { AddCustomerComponent } from '../../shared/components/add-customer/add-customer.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalstorageService } from '../../shared/services/localstorage.service';

@Component({
  selector: 'app-pins',
  imports: [CommonModule],
  templateUrl: './pins.component.html',
  styleUrl: './pins.component.scss',
})
export class PinsComponent {
  showModal: WritableSignal<boolean> = signal<boolean>(false);
  private modalService = inject(NgbModal);
  private localstorageService = inject(LocalstorageService);

  pins = this.localstorageService.getValue('pins');

  constructor() {}

  addCustomer() {
    this.modalService.open(AddCustomerComponent);
  }

  addPin() {
    const modalRefPin = this.modalService.open(AddPinComponent);
    modalRefPin.closed.subscribe(() => {
      this.pins = this.localstorageService.getValue('pins');
    });
  }
}
