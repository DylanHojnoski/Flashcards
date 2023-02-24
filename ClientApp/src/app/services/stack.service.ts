import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.http.get<Stack[]>(`${environment.apiUrl}/${this.url}`, { headers: header,  withCredentials: true})
  }

  public getPublicStacks() : Observable<Stack[]> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.http.get<Stack[]>(`${environment.apiUrl}/${this.url}` + "/PublicStacks", { headers: header,  withCredentials: true})
  }

  public getUserStacks() : Observable<Stack[]> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.http.get<Stack[]>(`${environment.apiUrl}/${this.url}` + "/UserStacks", { headers: header,  withCredentials: true})
  }

  public getStack(stack: Stack) : Observable<Stack> {
    return this.http.get<Stack>(`${environment.apiUrl}/${this.url}/${stack.id}`)
  }
  
  public upateStack(stack: Stack) : Observable<Stack[]> {
    return this.http.put<Stack[]>(`${environment.apiUrl}/${this.url}`, stack)
  }

  public createStack(stack: Stack) : Observable<Stack[]> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post<Stack[]>(`${environment.apiUrl}/${this.url}`, stack, { headers: header,  withCredentials: true})
  }

  public deleteStack(stack: Stack) : Observable<Stack[]> {
    return this.http.delete<Stack[]>(`${environment.apiUrl}/${this.url}/${stack.id}`)
  }
}
