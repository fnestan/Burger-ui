import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardCreationComponent } from './forward-creation.component';

describe('ForwardCreationComponent', () => {
  let component: ForwardCreationComponent;
  let fixture: ComponentFixture<ForwardCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
