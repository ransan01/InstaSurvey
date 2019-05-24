import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EntityFactoryService} from '../../entity-factory.service';
import {Entity} from '../../../entities/Entity';

const SURVEY_PAGE_BASE_URL = 'http://localhost:4200/survey-it/';
const SURVEY_LINK_ID = 'surveyLinkId';
@Component({
  selector: 'app-survey-link-generator',
  templateUrl: './survey-link-generator.component.html',
  styleUrls: ['./survey-link-generator.component.less']
})
export class SurveyLinkGeneratorComponent implements OnInit {
  private surveyId: string;
  private surveyLink: string;

  constructor(private route: ActivatedRoute,
              private entityFactory: EntityFactoryService) {
    this.route.parent.params.subscribe( params => this.surveyId = params.id  );
  }

  ngOnInit() {
  }

  public generateSurveyLink() {
    const surveyLinkEntity: Entity = this.entityFactory.createEntity('surveyLink', { surveyId: this.surveyId });
    surveyLinkEntity.create()
      .subscribe((data) => {
        console.log(data);
        this.surveyLink = SURVEY_PAGE_BASE_URL + data[SURVEY_LINK_ID];
      })
  }
}
