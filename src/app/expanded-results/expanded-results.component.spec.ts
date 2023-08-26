import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedResultsComponent } from './expanded-results.component';

describe('ExpandedResultsComponent', () => {
  let component: ExpandedResultsComponent;
  let fixture: ComponentFixture<ExpandedResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpandedResultsComponent]
    });
    fixture = TestBed.createComponent(ExpandedResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
