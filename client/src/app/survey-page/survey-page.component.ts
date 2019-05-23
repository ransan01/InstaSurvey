import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EntityFactoryService} from '../entity-factory.service';
import {Entity} from '../../entities/Entity';

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
    const surveyLinkEntity: Entity = this.entityFactory.getEntity('surveyLink', null);
    surveyLinkEntity.get(idVal)
      .subscribe((data: Entity) => {
        console.log(data);
        const surveyEntity: Entity = this.entityFactory.getEntity('survey', null);
        surveyEntity.get(data.surveyLink.surveyId)
          .subscribe((surveyData) => {
            console.log(surveyData);
          });
      });
  }
}
