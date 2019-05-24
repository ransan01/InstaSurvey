import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreatorComponent} from './creator/creator.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {SurveyListComponent} from './survey-list/survey-list.component';
import {SurveyPageComponent} from './survey-page/survey-page.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'creator', component: CreatorComponent},
  { path: 'list', component: SurveyListComponent},
  { path: 'survey-it/:id', component: SurveyPageComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
