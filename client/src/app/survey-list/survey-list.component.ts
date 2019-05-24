import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Entity} from '../../entities/Entity';
import {EntityFactoryService} from '../entity-factory.service';

export const SURVEY_LIST = 'surveyList';
@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.less']
})
export class SurveyListComponent implements OnInit {

  public surveyList: Object[];
  constructor(private http: HttpClient,
              private entityFactory: EntityFactoryService) { }

  ngOnInit() {
    this.getSurveyList();
  }

  public getSurveyList() {
    const surveyEntity: Entity = this.entityFactory.createEntity('survey', null);
    surveyEntity.get()
      .subscribe((data) => {
        console.log(data);
        this.surveyList = data[SURVEY_LIST];
      });
  }
}
