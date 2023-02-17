import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Stack } from '../models/stack';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  private url = "Card;"
  constructor(private http: HttpClient) { }

  public getCards() : Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}/${this.url}`)
  }

  public getCardsInStack(stack:Stack) : Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}/${this.url}/GetByStack/${stack.id}`)
  }

  public getCard(card: Card) : Observable<Card> {
    return this.http.get<Card>(`${environment.apiUrl}/${this.url}/${card.id}`)
  }
  
  public upateCard(card: Card) : Observable<Card[]> {
    return this.http.put<Card[]>(`${environment.apiUrl}/${this.url}`, card)
  }

  public createCard(card: Card) : Observable<Card[]> {
    return this.http.post<Card[]>(`${environment.apiUrl}/${this.url}`, card)
  }

  public deleteCard(card: Card) : Observable<Card[]> {
    return this.http.delete<Card[]>(`${environment.apiUrl}/${this.url}/${card.id}`)
  }
}
