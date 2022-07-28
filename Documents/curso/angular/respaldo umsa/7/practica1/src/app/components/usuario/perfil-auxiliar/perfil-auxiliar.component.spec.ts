import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAuxiliarComponent } from './perfil-auxiliar.component';

describe('PerfilAuxiliarComponent', () => {
  let component: PerfilAuxiliarComponent;
  let fixture: ComponentFixture<PerfilAuxiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAuxiliarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
