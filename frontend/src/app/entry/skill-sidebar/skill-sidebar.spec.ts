import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSidebar } from './skill-sidebar';

describe('SkillSidebar', () => {
  let component: SkillSidebar;
  let fixture: ComponentFixture<SkillSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
