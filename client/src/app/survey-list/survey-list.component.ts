import { Component, OnInit } from '@angular/core';
import * as Survey from 'survey-angular';
import {HttpClient} from '@angular/common/http';
// import {EntityFactory} from '../../entities/EntityFactory';
import {Entity} from '../../entities/Entity';
import {EntityFactoryService} from '../entity-factory.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.less']
})
export class SurveyListComponent implements OnInit {

  json = {
    completedHtml: '<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>',
    completedHtmlOnCondition: [
      {
        expression: '{nps_score} > 8',
        html: '<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product.' +
        ' Your ideas and suggestions will help us to make our product even better!</h5>'
      }, {
        expression: '{nps_score} < 7',
        html: '<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.' +
        'We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5>\n'
      }
    ],
    pages: [
      {
        name: 'page1',
        elements: [
          {
            type: 'rating',
            name: 'nps_score',
            title: 'On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?',
            isRequired: true,
            rateMin: 0,
            rateMax: 10,
            minRateDescription: '(Most unlikely)',
            maxRateDescription: '(Most likely)'
          }, {
            type: 'checkbox',
            name: 'promoter_features',
            visibleIf: '{nps_score} >= 9',
            title: 'What features do you value the most?',
            isRequired: true,
            validators: [
              {
                type: 'answercount',
                text: 'Please select two features maximum.',
                maxCount: 2
              }
            ],
            hasOther: true,
            choices: [
              'Performance', 'Stability', 'User Interface', 'Complete Functionality'
            ],
            otherText: 'Other feature:',
            colCount: 2
          }, {
            type: 'comment',
            name: 'passive_experience',
            visibleIf: '{nps_score} > 6  and {nps_score} < 9',
            title: 'What is the primary reason for your score?'
          }, {
            type: 'comment',
            name: 'disappointed_experience',
            visibleIf: '{nps_score} notempty',
            title: 'What do you miss and what was disappointing in your experience with us?'
          }
        ]
      }
    ],
    showQuestionNumbers: 'off'
  };

  constructor(private http: HttpClient,
              private entityFactory: EntityFactoryService) { }

  ngOnInit() {
    let survey = new Survey.Model(this.json);
    survey.onComplete.add((result) => {
      this.sendRequest();
    });

    Survey.SurveyNG.render('surveyElement', { model: survey });
  }

  public sendRequest() {
    console.log('Sending Request');
    const dataObj = {
      surveyName: "Survey1",
      surveyBody: {
        title: "Product Feedback Survey Example",
        showProgressBar: "top",
        pages: [
          {
            elements: [
              {
                type: "text",
                inputMask: "phone",
                popupdescription: "Some text"
              },
              {
                type: "barrating",
                name: "barrating",
                ratingTheme: "css-stars",
                choices: [1, 2, 3, 4, 5]
              },
              {
                type: "bootstrapslider",
                name: "bootstrapslider"
              },
            ]
          },
          {
            questions: [
              {
                type: "rating",
                name: "satisfaction",
                title: "How satisfied are you with the Product?",
                mininumRateDescription: "Not Satisfied",
                maximumRateDescription: "Completely satisfied"
              }
            ]
          },
        ]
      }
    };
    const surveyEntity: Entity = this.entityFactory.createEntity('survey', dataObj);
    surveyEntity.create()
      .subscribe((data) => {});
  }
}
