import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightsoutGameComponent } from './lightsout-game.component';

describe('LightsoutGameComponent', () => {
  let component: LightsoutGameComponent;
  let fixture: ComponentFixture<LightsoutGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightsoutGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightsoutGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
