import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserPopupComponent } from './adduser-popup.component';

describe('AdduserPopupComponent', () => {
  let component: AdduserPopupComponent;
  let fixture: ComponentFixture<AdduserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdduserPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdduserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
