import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPersonaComponent } from './eliminar-persona.component';

describe('EliminarPersonaComponent', () => {
  let component: EliminarPersonaComponent;
  let fixture: ComponentFixture<EliminarPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
