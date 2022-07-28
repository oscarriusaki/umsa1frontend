import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEnfermedadComponent } from './buscar-enfermedad.component';

describe('BuscarEnfermedadComponent', () => {
  let component: BuscarEnfermedadComponent;
  let fixture: ComponentFixture<BuscarEnfermedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarEnfermedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
