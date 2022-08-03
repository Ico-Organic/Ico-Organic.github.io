import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAsesoriasComponent } from './view-asesorias.component';

describe('ViewAsesoriasComponent', () => {
  let component: ViewAsesoriasComponent;
  let fixture: ComponentFixture<ViewAsesoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAsesoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAsesoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
