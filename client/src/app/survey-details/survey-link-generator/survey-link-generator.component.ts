import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EntityFactoryService} from '../../entity-factory.service';
import {Entity} from '../../../entities/Entity';

const SURVEY_PAGE_BASE_URL = 'http://localhost:5000/api/v1/survey-it/';
@Component({
  selector: 'app-survey-link-generator',
  templateUrl: './survey-link-generator.component.html',
  styleUrls: ['./survey-link-generator.component.less']
})
export class SurveyLinkGeneratorComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private entityFactory: EntityFactoryService) {
    this.route.parent.params.subscribe( params => this.generateSurveyLink(params.id)  );
  }

  ngOnInit() {
  }

  public generateSurveyLink(idVal: string) {
    console.log(idVal);
  }
}
