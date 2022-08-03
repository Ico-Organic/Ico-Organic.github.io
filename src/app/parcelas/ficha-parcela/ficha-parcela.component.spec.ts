import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaParcelaComponent } from './ficha-parcela.component';

describe('FichaParcelaComponent', () => {
  let component: FichaParcelaComponent;
  let fixture: ComponentFixture<FichaParcelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaParcelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaParcelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
