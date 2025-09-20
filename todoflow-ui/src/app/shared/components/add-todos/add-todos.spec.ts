import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodos } from './add-todos';

describe('AddTodos', () => {
  let component: AddTodos;
  let fixture: ComponentFixture<AddTodos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTodos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
