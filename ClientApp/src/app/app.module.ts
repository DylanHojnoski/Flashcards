import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StackComponent } from './components/stack/stack.component';
import { CardComponent } from './components/card/card.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {StudyFlashcardsComponent} from './components/study-flashcards/study-flashcards.component';
import { CreateStackComponent } from './components/create-stack/create-stack.component';

@NgModule({
  declarations: [
    AppComponent,
    StackComponent,
    CardComponent,
    StudyFlashcardsComponent,
    NavbarComponent,
    CreateStackComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
