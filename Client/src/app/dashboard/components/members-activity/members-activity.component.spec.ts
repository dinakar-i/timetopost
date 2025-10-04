import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersActivityComponent } from './members-activity.component';

describe('MembersActivityComponent', () => {
  let component: MembersActivityComponent;
  let fixture: ComponentFixture<MembersActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
