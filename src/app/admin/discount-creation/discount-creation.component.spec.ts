import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountCreationComponent } from './discount-creation.component';

describe('DiscountCreationComponent', () => {
  let component: DiscountCreationComponent;
  let fixture: ComponentFixture<DiscountCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
