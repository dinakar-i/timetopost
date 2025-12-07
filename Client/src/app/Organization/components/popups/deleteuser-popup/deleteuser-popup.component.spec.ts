import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteuserPopupComponent } from './deleteuser-popup.component';

describe('DeleteuserPopupComponent', () => {
  let component: DeleteuserPopupComponent;
  let fixture: ComponentFixture<DeleteuserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteuserPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteuserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
