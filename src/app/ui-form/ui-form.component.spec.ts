import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormComponent } from './ui-form.component';

describe('UiFormComponent', () => {
  let component: UiFormComponent;
  let fixture: ComponentFixture<UiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
