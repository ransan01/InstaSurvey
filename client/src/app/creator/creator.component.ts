import { Component, OnInit } from '@angular/core';
import * as Survey from 'survey-angular';
import { SurveyCreator } from 'survey-creator';

import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


Survey.StylesManager.applyTheme('default');

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.less']
})


export class CreatorComponent implements OnInit {
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
  private creator;
  constructor(private  httpClient: HttpClient) { }

  ngOnInit() {
    /*let survey = new Survey.Model(this.json);
    survey.onComplete.add((result) => {
      });

    Survey.SurveyNG.render('surveyElement', { model: survey });*/
    Survey.StylesManager
      .applyTheme('bootstrap');

    const creatorOptions = {};
    this.creator = new SurveyCreator('creatorElement', creatorOptions);

    // Setting this callback will make visible the "Save" button
    this.creator.saveSurveyFunc = () => {
      // save the survey JSON
      const jsonEl: any = document.getElementById('surveyJSON');
      jsonEl.value = this.creator.text;
      this.httpClient.post('localhost:5000/api/v1/survey',
        {
          surveyName: 'Test',
          surveyBody: JSON.parse(this.creator.text)
        }, {})
        .subscribe(
          data  => {
            console.log('POST Request is successful ', data);
          },
          error  => {
            console.log('Error', error);
          });
    };

    this.creator.text = '{ pages: [{ name:\'page1\', questions: [{ type: \'text\', name:\"Test question\"}]}]}';
    this.loadSurvey();
  }

  onClick() {
    const newQuestion = {
      type: 'rating',
      name: 'nps_score2',
      title: 'On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?',
      isRequired: true,
      rateMin: 0,
      rateMax: 10,
      minRateDescription: '(Most unlikely)',
      maxRateDescription: '(Most likely)'
    };
    console.log(this.json.pages[0].elements);
    this.json.pages[0].elements.push(newQuestion);
    const survey = new Survey.Model(this.json);
    Survey.SurveyNG.render('surveyElement', { model: survey });
  }

  loadSurvey() {
    const json: any = document.getElementById('surveyJSON');
    json.value = this.creator.text;
  }

  setSurvey() {
    const json: any = document.getElementById('surveyJSON');
    this.creator.text = json.value;
  }
}
