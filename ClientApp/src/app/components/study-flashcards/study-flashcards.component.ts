import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Stack } from 'src/app/models/stack';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-study-flashcards',
  templateUrl: './study-flashcards.component.html',
  styleUrls: ['./study-flashcards.component.css']
})
export class StudyFlashcardsComponent implements OnInit {
  cards : Card[] = new Array();
  @Output() exitStudyEvent = new EventEmitter<boolean>();
  @Input() stack: Stack = new Stack;
  index = 0; 
  answerActive = false;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getCardsInStack(this.stack).subscribe((result : Card[]) => (this.cards = result));
  }

  showAnswer(): void {
    this.answerActive = !this.answerActive;
  }

  nextCard(): void {
    if (this.index < this.cards.length - 1) {
      this.index += 1;
      this.answerActive = false;
    }
  }

  previousCard(): void {
    if (this.index > 0) {
      this.index -= 1;
      this.answerActive = false;
    }
  }

  restart() {
    let replacedCard: Card;
    for (let i = 0; i < this.cards.length; i++) {
      replacedCard = this.cards[i];
      let randomInt = Math.floor(Math.random()*this.cards.length);
      this.cards[i] = this.cards[randomInt];
      this.cards[randomInt] = replacedCard;
    }
    this.index = 0;
    this.answerActive = false;
  }

  exitStudy() {
    this.exitStudyEvent.emit(false);
  }
}
