import { Component, OnInit } from '@angular/core';
import { Stack } from 'src/app/models/stack';
import { Pages } from 'src/app/models/pages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  stackToEdit?: Stack;
  shownStacks?: Stack[]
  selectedStack: Stack = new Stack  ;
  signIn = false;
  pageEnum = Pages;
  activePage = Pages.Explore;

  constructor() { }

  ngOnInit(): void {
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

  toggleSignIn() {
    this.signIn = !this.signIn;
  }

  addStack(stack: Stack) {
    this.shownStacks?.push(stack);
  }

}
