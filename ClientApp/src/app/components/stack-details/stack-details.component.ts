import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card'
import { Stack } from 'src/app/models/stack';
import { CardService } from 'src/app/services/card.service'

@Component({
  selector: 'app-stack-details',
  templateUrl: './stack-details.component.html',
  styleUrls: ['./stack-details.component.css']
})
export class StackDetailsComponent implements OnInit {
  @Input() stack: Stack = new Stack;
  cards: Card[] = new Array;
  card: Card = new Card;
  study = false;
  edit = false;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getCardsInStack(this.stack).subscribe((results) => (this.cards = results));
  }

  createCard(card: Card) {
    if (card.question == "" || card.answer == "") {
      return;
    }
    card.stackId = this.stack.id;
    this.cardService.createCard(card).subscribe((results) => (this.cards = results));
    card.question = "";
    card.answer = "";
  }

  toggleStudy() {
    if (this.cards.length > 0) {
      this.study = !this.study;
    } 
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  saveEdit(card: Card) {
    this.cardService.upateCard(card).subscribe();
    this.cardService.getCardsInStack(this.stack).subscribe((results) => (this.cards = results));
    this.toggleEdit();
  }

}
