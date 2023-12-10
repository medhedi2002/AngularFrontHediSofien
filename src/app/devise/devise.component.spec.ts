import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviseComponent } from './devise.component';

describe('DeviseComponent', () => {
  let component: DeviseComponent;
  let fixture: ComponentFixture<DeviseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviseComponent]
    });
    fixture = TestBed.createComponent(DeviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
