import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEntryList } from './all-entry-list';

describe('AllEntryList', () => {
  let component: AllEntryList;
  let fixture: ComponentFixture<AllEntryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllEntryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEntryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
