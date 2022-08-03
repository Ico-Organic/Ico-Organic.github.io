import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaLightComponent } from './ficha-light.component';

describe('FichaLightComponent', () => {
  let component: FichaLightComponent;
  let fixture: ComponentFixture<FichaLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaLightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
