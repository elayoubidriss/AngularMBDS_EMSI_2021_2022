import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppyLoginComponent } from './appy-login.component';

describe('AppyLoginComponent', () => {
  let component: AppyLoginComponent;
  let fixture: ComponentFixture<AppyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppyLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
