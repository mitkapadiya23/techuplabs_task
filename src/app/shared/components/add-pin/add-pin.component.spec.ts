import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPinComponent } from './add-pin.component';

describe('AddPinComponent', () => {
  let component: AddPinComponent;
  let fixture: ComponentFixture<AddPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
