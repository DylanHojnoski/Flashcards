import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private clientId = environment.clientId;
  constructor(private service: UserService,
    private _ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    // @ts-ignore
      window.onGoogleLibraryLoad = () => {
        // @ts-ignore
        google.accounts.id.initialize({
          client_id: this.clientId,
          callback: this.handleCredentialResponse.bind(this),
          cancel_on_tap_outside: true
        });
        // @ts-ignore
        google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
          { theme: "outline", size: "large", width: "100%" } 
        );
      const button = document.getElementById("signoutButton");
        // @ts-ignore
        button.onclick = () => {
        // @ts-ignore
google.accounts.id.disableAutoSelect();
        console.log("disableAutoSelect")
        // @ts-ignore
    }
        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {});
      }; 
  }
  async handleCredentialResponse(response: CredentialResponse) {
      await this.service.LoginWithGoogle(response.credential).subscribe(
        (x:any) => {
//          localStorage.setItem("token", x.token);
          this._ngZone.run(() => {
            //this.router.navigate(['/logout']);
          })},
        (error:any) => {
            console.log(error);
            console.log("Error");
          }
        );  
  }

  public logout() {
    this.service.signOutExternal;
  }

}
