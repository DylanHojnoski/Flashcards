import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
