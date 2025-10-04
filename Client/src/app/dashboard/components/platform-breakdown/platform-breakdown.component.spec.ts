import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformBreakdownComponent } from './platform-breakdown.component';

describe('PlatformBreakdownComponent', () => {
  let component: PlatformBreakdownComponent;
  let fixture: ComponentFixture<PlatformBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
