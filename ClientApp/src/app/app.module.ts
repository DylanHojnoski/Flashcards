import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StackComponent } from './components/stack/stack.component';
import { CardComponent } from './components/card/card.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {StudyFlashcardsComponent} from './components/study-flashcards/study-flashcards.component';
import { CreateStackComponent } from './components/create-stack/create-stack.component';
import { StackDetailsComponent } from './components/stack-details/stack-details.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TagSelectorComponent } from './components/tag-selector/tag-selector.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    StackComponent,
    CardComponent,
    StudyFlashcardsComponent,
    NavbarComponent,
    CreateStackComponent,
    StackDetailsComponent,
    FiltersComponent,
    TagSelectorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
