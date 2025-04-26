import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YathzeeDicesComponent } from './yathzee-dices.component';

describe('YathzeeDicesComponent', () => {
  let component: YathzeeDicesComponent;
  let fixture: ComponentFixture<YathzeeDicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YathzeeDicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YathzeeDicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
