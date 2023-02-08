import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPedidoComponent } from './asignar-pedido.component';

describe('AsignarPedidoComponent', () => {
  let component: AsignarPedidoComponent;
  let fixture: ComponentFixture<AsignarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
