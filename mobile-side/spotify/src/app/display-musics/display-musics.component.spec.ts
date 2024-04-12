import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMusicsComponent } from './display-musics.component';

describe('DisplayMusicsComponent', () => {
  let component: DisplayMusicsComponent;
  let fixture: ComponentFixture<DisplayMusicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMusicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayMusicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
