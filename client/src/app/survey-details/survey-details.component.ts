import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EntityFactoryService} from '../entity-factory.service';
import {Entity} from '../../entities/Entity';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.less']
})
export class SurveyDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private entityFactory: EntityFactoryService) {
    console.log("Survey Details");
    this.route.params.subscribe( params => this.getSurveyDetails(params.id)  );
  }

  ngOnInit() {
  }

  private getSurveyDetails(idVal: string) {
    const surveyLinkEntity: Entity = this.entityFactory.createEntity('survey', null);
    surveyLinkEntity.get(idVal)
      .subscribe((data) => {
        console.log(data);
      });
  }
}

/*{
  console.log(params);
  this.getSurveyDetails(params.id);
}*/
