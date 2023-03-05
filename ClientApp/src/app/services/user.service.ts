import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = "User";
  constructor(private httpClient: HttpClient) { }

  signOutExternal = () => {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.httpClient.post(environment.apiUrl + "/" + this.url + "/Logout" , { headers: header, withCredentials: true });
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.httpClient.post(environment.apiUrl + "/" + this.url + "/LoginWithGoogle" , JSON.stringify(credentials), { headers: header, withCredentials: true });
  }

  GetCurrentUser(): Observable<any> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.httpClient.get(environment.apiUrl + "/" + this.url + "/GetCurrentUser" , { headers: header, withCredentials: true });
  }

  UpdateUser(user: User): Observable<any> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.httpClient.put(environment.apiUrl + "/" + this.url , user,  { headers: header, withCredentials: true });
  }

 GetUserByName(user: User): Observable<any> {
    const header = new HttpHeaders().set("Content-type", "application/json");
    return this.httpClient.get(environment.apiUrl + "/" + this.url + "/GetUserByName/" + user.name,  { headers: header, withCredentials: true });
  }
}
