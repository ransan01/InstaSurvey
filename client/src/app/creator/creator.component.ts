import { Component, OnInit } from '@angular/core';
import * as Survey from 'survey-angular';
import { SurveyCreator } from 'survey-creator';

import { Injectable } from '@angular/core';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';


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
  constructor(private httpClient: HttpClient,
              private route: Router) { }

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
    this.creator.saveSurveyFunc = (saveNo, callback) => {
      // save the survey JSON
      const jsonEl: any = document.getElementById('surveyJSON');
      jsonEl.value = this.creator.text;
      const body = {
        surveyName: 'Test',
        surveyBody: JSON.parse(this.creator.text)
      };
      this.httpClient.post<any>('http://localhost:5000/api/v1/survey',
        body, {})
        .subscribe((res) => {
          console.log('Successful POST');
          console.log(res);
          this.route.navigate(['/survey/details', res['surveyId']])
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            // Backend returns unsuccessful response codes such as 404, 500 etc.
            console.log('Backend returned status code: ', err.status);
            console.log('Response body:', err.error);
          }
        });
    };

    this.creator.text = '{ pages: [{ name:\'page1\', questions: [{ type: \'text\', name:\"Test question\"}]}]}';
    this.loadSurvey();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
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
