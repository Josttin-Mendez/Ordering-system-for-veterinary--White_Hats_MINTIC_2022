import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPersonaComponent } from './buscar-persona.component';

describe('BuscarPersonaComponent', () => {
  let component: BuscarPersonaComponent;
  let fixture: ComponentFixture<BuscarPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
