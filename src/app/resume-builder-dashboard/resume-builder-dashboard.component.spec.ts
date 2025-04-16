import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderDashboardComponent } from './resume-builder-dashboard.component';

describe('ResumeBuilderDashboardComponent', () => {
  let component: ResumeBuilderDashboardComponent;
  let fixture: ComponentFixture<ResumeBuilderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeBuilderDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeBuilderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
