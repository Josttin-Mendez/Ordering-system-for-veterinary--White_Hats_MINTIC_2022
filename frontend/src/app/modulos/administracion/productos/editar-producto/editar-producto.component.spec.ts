import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductoComponent } from './editar-producto.component';

describe('EditarProductoComponent', () => {
  let component: EditarProductoComponent;
  let fixture: ComponentFixture<EditarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
