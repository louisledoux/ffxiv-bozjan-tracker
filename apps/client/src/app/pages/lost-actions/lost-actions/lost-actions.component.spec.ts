import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostActionsComponent } from './lost-actions.component';

describe('LostActionsComponent', () => {
  let component: LostActionsComponent;
  let fixture: ComponentFixture<LostActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
