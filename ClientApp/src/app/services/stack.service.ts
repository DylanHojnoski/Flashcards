import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stack } from '../models/stack';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StackService {
  private url = "Stack";
  constructor(private http: HttpClient) { }

  public getStacks() : Observable<Stack[]> {
    return this.http.get<Stack[]>(`${environment.apiUrl}/${this.url}`)
  }

  public getStack(stack: Stack) : Observable<Stack> {
    return this.http.get<Stack>(`${environment.apiUrl}/${this.url}/${stack.id}`)
  }
  
  public upateStack(stack: Stack) : Observable<Stack[]> {
    return this.http.put<Stack[]>(`${environment.apiUrl}/${this.url}`, stack)
  }

  public createStack(stack: Stack) : Observable<Stack[]> {
    return this.http.post<Stack[]>(`${environment.apiUrl}/${this.url}`, stack)
  }

  public deleteStack(stack: Stack) : Observable<Stack[]> {
    return this.http.delete<Stack[]>(`${environment.apiUrl}/${this.url}/${stack.id}`)
  }
}
