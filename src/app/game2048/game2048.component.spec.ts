import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Game2048Component } from './game2048.component';

describe('Game2048Component', () => {
  let component: Game2048Component;
  let fixture: ComponentFixture<Game2048Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Game2048Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Game2048Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Test for game component init',()=> {
  let component: Game2048Component = new Game2048Component();
  it(
    'validar creacion matriz', ()=> {
      expect(component.createArray(2)).toEqual([[0,0],[0,0]]);
    }
  );
  it(
    'validar creacion matriz con negativos', ()=> {
      expect(component.createArray(-1)).toEqual([]);
    }
  );
}
);

describe('Test for movements game', ()=> {
  let component: Game2048Component = new Game2048Component();
  it(
    'derecha simple 1', ()=> {
      expect(component.moveRight([[2,0],[0,0]]))
      .toEqual([[0,2],[0,0]]);
    }
  );
  it(
    'derecha simple 2', ()=> {
      expect(component.moveRight([[2,2],[0,0]]))
      .toEqual([[0,4],[0,0]]);
    }
  );
  it(
    'derecha simple 3', ()=> {
      expect(component.moveRight([[2,2],[2,2]]))
      .toEqual([[0,4],[0,4]]);
    }
  );
  it(
    'derecha simple 4', ()=> {
      expect(component.moveRight([[2,4],[2,4]]))
      .toEqual([[2,4],[2,4]]);
    }
  );
  it(
    'derecha fila simple 1', ()=> {
      expect(component.moveRightRow([0,2,4,0,4]))
      .toEqual([0,0,0,2,8]);
    }
  );
  it(
    'derecha fila simple 2', ()=> {
      expect(component.moveRightRow([0,2,2,4,4]))
      .toEqual([0,0,0,4,8]);
    }
  );
  it(
    'derecha fila simple 3', ()=> {
      expect(component.moveRightRow([0,4,4,4,4]))
      .toEqual([0,0,0,8,8]);
    }
  );
  it(
    'derecha fila simple 4', ()=> {
      expect(component.moveRightRow([0,0,4,4,4]))
      .toEqual([0,0,0,4,8]);
    }
  );
  it(
    'derecha fila simple 5', ()=> {
      expect(component.moveRightRow([0,0,4,4,8]))
      .toEqual([0,0,0,8,8]);
    }
  );
  it(
    'derecha fila simple 6', ()=> {
      expect(component.moveRightRow([4,0,0,4,8]))
      .toEqual([0,0,0,8,8]);
    }
  );
});
