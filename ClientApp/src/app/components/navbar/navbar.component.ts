import { Component, OnInit } from '@angular/core';
import { Stack } from 'src/app/models/stack';
import { Pages } from 'src/app/models/pages';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    stackToEdit?: Stack;
    shownStacks?: Stack[]
    selectedStack: Stack = new Stack  ;
    signedIn = false;
    signIn = false;
    pageEnum = Pages;
    activePage = Pages.Explore;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.GetCurrentUser().subscribe(async result => {
            if (await result != null) {
                this.toggleSignedIn();
            }
        })
    }

    selectHome() {
        this.activePage = this.pageEnum.Home;
        this.shownStacks = undefined;
    }

    selectExplore() {
        this.activePage = this.pageEnum.Explore;
        this.shownStacks = undefined;
    }

    selectAccount() {
        this.activePage = this.pageEnum.Account;
        this.shownStacks = undefined;
    }

    createStack() {
        this.stackToEdit = new Stack;
    }

    selectStack(stack: Stack) {
        this.selectedStack = stack;
        this.activePage = Pages.StackDetails;
    }

    unselectStack() {
        //this.selectedStack = undefined;
    }

    toggleSignedIn() {
        if (this.signedIn == true) {
            this.activePage = Pages.Explore;
        }
        this.signedIn = !this.signedIn;
        this.signIn = false;
    }

    toggleSignIn() {
        this.signIn = !this.signIn;
    }

    addStack(stack: Stack) {
        this.shownStacks?.push(stack);
    }

}
