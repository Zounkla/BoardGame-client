import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YathzeeGameComponent } from './yathzee-game.component';

describe('YathzeeGameComponent', () => {
  let component: YathzeeGameComponent;
  let fixture: ComponentFixture<YathzeeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YathzeeGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YathzeeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
