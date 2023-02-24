import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signOutExternal() {
    console.log("Delete token");
    document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "LoginWithGoogle/" + JSON.stringify(credentials), JSON.stringify(credentials), { headers: header });
  }
}
