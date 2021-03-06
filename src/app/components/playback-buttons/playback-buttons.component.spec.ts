import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlaybackButtonsComponent } from './playback-buttons.component';

describe('PlaybackButtonsComponent', () => {
  let component: PlaybackButtonsComponent;
  let fixture: ComponentFixture<PlaybackButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybackButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
