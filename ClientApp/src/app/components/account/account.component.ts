import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    @Output() logoutEvent = new EventEmitter<boolean>();
  currentUser: User = new User;
  editUser: User = new User;
  existingUser: User[] = []; 
  constructor(private userService: UserService) { }
  editActive = false;
  nameTaken = false;
  emailTaken = false;

  ngOnInit(): void {
    this.userService.GetCurrentUser().subscribe(result => this.currentUser = result);
    this.editUser = this.currentUser;
  }

  toggleEdit() {
    this.editActive = !this.editActive;
  }

  logout() {
      this.userService.Logout().subscribe();
      this.logoutEvent.emit();
  }

  getUserName(user: User): Promise<User> {
      return new Promise<User>(resolve => this.userService.GetUserByName(user).subscribe(result => {resolve(result)}));
  }

  async saveEdit(user: User) {
      if (user.name == "" && user.email == "") {
          return;
      }
      let userFound = false;

      let existingUser: User = await this.getUserName(user)
      if (existingUser != null){
          userFound = true;
      }
      if (userFound && existingUser.id != this.currentUser.id) {
          this.nameTaken = true;
          this.editUser = new User;
          return;
      }
      this.editUser.id = this.currentUser.id;
      this.editUser.email = this.currentUser.email;
      this.userService.UpdateUser(this.editUser).subscribe();
      this.currentUser.name = this.editUser.name;
      this.editUser = new User;
      this.nameTaken = false;

      this.toggleEdit();
  }

}
