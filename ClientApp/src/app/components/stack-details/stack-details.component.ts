import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card'
import { Stack } from 'src/app/models/stack';
import { CardService } from 'src/app/services/card.service'
import { UserService } from 'src/app/services/user.service'
import { Pages } from 'src/app/models/pages';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-stack-details',
    templateUrl: './stack-details.component.html',
    styleUrls: ['./stack-details.component.css']
})
export class StackDetailsComponent implements OnInit {
    @Input() stack: Stack = new Stack;
    @Input() activePage?: Pages;
    pageEnum = Pages;
    cards: Card[] = new Array;
    card: Card = new Card;
    study = false;
    edit = false;
    user: User = new User; 

    constructor(private cardService: CardService, private userService: UserService) { }

    ngOnInit(): void {
        this.cardService.getCardsInStack(this.stack).subscribe((results) => (this.cards = results));
        this.userService.GetCurrentUser().subscribe((result) => (this.user = result)); 
    }


    createCard(card: Card) {
        if (card.question == "" || card.answer == "") {
            return;
        }
        card.stackId = this.stack.id;
        this.cardService.createCard(card).subscribe(results => this.cards = results.filter(cards => cards.stackId == card.stackId));
        this.card = new Card;
    }

    deleteCard(card: Card) {
        this.cardService.deleteCard(card).subscribe(results => this.cards = results.filter(cards => cards.stackId == card.stackId));
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
        if (card.question == "" || card.answer == "") {
            return;
        }
        this.cardService.upateCard(card).subscribe();
        this.card.question = card.question;
        this.card.answer = card.answer;
        this.toggleEdit();
        this.card = new Card;
    }

}
