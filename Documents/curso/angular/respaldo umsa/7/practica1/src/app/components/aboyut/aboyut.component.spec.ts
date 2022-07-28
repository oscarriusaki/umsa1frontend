import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboyutComponent } from './aboyut.component';

describe('AboyutComponent', () => {
  let component: AboyutComponent;
  let fixture: ComponentFixture<AboyutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboyutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboyutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
