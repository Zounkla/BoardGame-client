import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YathzeeGridComponent } from './yathzee-grid.component';

describe('YathzeeGridComponent', () => {
  let component: YathzeeGridComponent;
  let fixture: ComponentFixture<YathzeeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YathzeeGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YathzeeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
