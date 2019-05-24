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
  private creator;
  private json;

  constructor(private httpClient: HttpClient,
              private route: Router) { }

  ngOnInit() {
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
          this.route.navigate(['/survey/details', res['surveyId']]);
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
    const defaultQuestion = {
      pages: [
        {
          name: 'page1',
          elements: [
            {
              type: 'radiogroup',
              name: 'question1',
              title: 'Who do you think should win CSG Hackathon 2019',
              choices: [
                'LectoLectro',
                'Lone Coder',
                'Night Watchers',
                'No One',
                'ATS-6733',
                'Not so Fantastic Four',
                'Unhandled Exceptions',
                'D Bug Hunters',
                'MKS-4',
                'F1-Fear One',
                'SIMBA',
                'SVeeter',
                'Unfired',
                'Ascendon Tiger Team',
                'Infinite-3',
                'CSG Titans',
                'Team Jhappi',
                'OperationHack',
                'Anonymous Hackers',
                'Formula-F2',
                'WhattsApp Us',
                'HackOut',
                'CSGOne',
                'Desi Boyz',
                'Formula Five',
                'Thugs of CSG',
                'PackOf3',
                'ACSR VISION',
                'Avengers 5.0',
                'CodeCrackers',
                'Techie Tribe',
                'Anuradha',
                'Ravali Madabhushanam',
                'The Mavericks',
                'Bro-grammers',
                'Powerpuff Girls',
                'beep',
                'M2 ',
                'DbDudez',
                'Sirius'
              ]
            }
          ]
        }
      ]
    };
    this.creator.text = JSON.stringify(defaultQuestion);
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
