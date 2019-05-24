import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatorComponent } from './creator/creator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

import { MatTabsModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {EntityFactoryService} from './entity-factory.service';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { HeaderPaneComponent } from './header-pane/header-pane.component';
import { SurveyRenderComponent } from './survey-render/survey-render.component';
import { SurveyDetailsComponent } from './survey-details/survey-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
    PageNotFoundComponent,
    HomeComponent,
    SurveyListComponent,
    SurveyPageComponent,
    HeaderPaneComponent,
    SurveyRenderComponent,
    SurveyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [EntityFactoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
