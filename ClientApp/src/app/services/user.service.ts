import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = "User";
  constructor(private httpClient: HttpClient) { }

  signOutExternal = () => {
    localStorage.removeItem("token");
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.httpClient.post(environment.apiUrl + "/" + this.url + "/LoginWithGoogle" , JSON.stringify(credentials), { headers: header, withCredentials: true });
  }
}
