import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicByStyleComponent } from './music-by-style.component';

describe('MusicByStyleComponent', () => {
  let component: MusicByStyleComponent;
  let fixture: ComponentFixture<MusicByStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicByStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicByStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
