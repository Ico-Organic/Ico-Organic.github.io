import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParcelasComponent } from './view-parcelas.component';

describe('ViewParcelasComponent', () => {
  let component: ViewParcelasComponent;
  let fixture: ComponentFixture<ViewParcelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParcelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
