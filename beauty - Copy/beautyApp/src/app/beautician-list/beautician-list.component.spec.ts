import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeauticianListComponent } from './beautician-list.component';

describe('BeauticianListComponent', () => {
  let component: BeauticianListComponent;
  let fixture: ComponentFixture<BeauticianListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeauticianListComponent]
    });
    fixture = TestBed.createComponent(BeauticianListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
