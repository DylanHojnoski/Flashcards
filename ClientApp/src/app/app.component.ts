import { Component } from '@angular/core';
import { Stack } from 'src/app/models/stack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  stackToEdit?: Stack;

  createStack() {
    this.stackToEdit = new Stack;
  }
}
