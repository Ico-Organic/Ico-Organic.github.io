import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerParComponent } from './ver-par.component';

describe('VerParComponent', () => {
  let component: VerParComponent;
  let fixture: ComponentFixture<VerParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerParComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
