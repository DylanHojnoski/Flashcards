import { Component, OnInit } from '@angular/core';
import { Stack } from 'src/app/models/stack';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  stackToEdit?: Stack;

  constructor() { }

  ngOnInit(): void {
  }

  createStack() {
    this.stackToEdit = new Stack;
  }

}
