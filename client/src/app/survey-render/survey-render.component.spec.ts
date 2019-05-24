import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRenderComponent } from './survey-render.component';

describe('SurveyRenderComponent', () => {
  let component: SurveyRenderComponent;
  let fixture: ComponentFixture<SurveyRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
