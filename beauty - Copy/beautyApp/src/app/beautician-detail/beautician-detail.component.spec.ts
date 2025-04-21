import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauticianDetailComponent } from './beautician-detail.component';

describe('BeauticianDetailComponent', () => {
  let component: BeauticianDetailComponent;
  let fixture: ComponentFixture<BeauticianDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeauticianDetailComponent]
    });
    fixture = TestBed.createComponent(BeauticianDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
