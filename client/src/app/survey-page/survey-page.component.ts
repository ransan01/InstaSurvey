import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EntityFactoryService} from '../entity-factory.service';
import {Entity} from '../../entities/Entity';
import {SurveyLink} from '../../entities/SurveyLink';
import * as _ from 'lodash';
import {Model, SurveyNG} from 'survey-angular';

export const SURVEY_LINK = 'surveyLink';
@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.less']
})
export class SurveyPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private entityFactory: EntityFactoryService) {
    this.route.params.subscribe( params => this.getSurvey(params.id) );
  }

  ngOnInit() {
  }

  public getSurvey(idVal: string): void {
    const surveyLinkEntity: Entity = this.entityFactory.createEntity('surveyLink', null);
    surveyLinkEntity.get(idVal)
      .subscribe((data: SurveyLink) => {
        console.log(data);
        const surveyEntity: Entity = this.entityFactory.createEntity('survey', null);
        if (_.isNil(data[SURVEY_LINK])) {
          console.log('Error: Survey link not found');
          return;
        }
        surveyEntity.get(data[SURVEY_LINK].surveyId)
          .subscribe((surveyData: any) => {
            console.log('surveyData');
            console.log(surveyData);
            const survey = new Model(surveyData.survey.surveyBody);
            survey.onComplete.add((result) => {
            });

            SurveyNG.render('surveyElement', { model: survey });
          });
      });
  }
}
