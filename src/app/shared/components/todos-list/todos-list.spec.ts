import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosList } from './todos-list';

describe('TodosList', () => {
  let component: TodosList;
  let fixture: ComponentFixture<TodosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
