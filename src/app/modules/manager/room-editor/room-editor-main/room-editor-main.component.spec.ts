import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditorMainComponent } from './room-editor-main.component';

describe('RoomEditorMainComponent', () => {
  let component: RoomEditorMainComponent;
  let fixture: ComponentFixture<RoomEditorMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomEditorMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
