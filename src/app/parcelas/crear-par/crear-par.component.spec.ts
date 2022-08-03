import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearParComponent } from './crear-par.component';

describe('CrearParComponent', () => {
  let component: CrearParComponent;
  let fixture: ComponentFixture<CrearParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearParComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
