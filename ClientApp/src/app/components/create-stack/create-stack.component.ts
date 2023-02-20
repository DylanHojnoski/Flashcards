import { Stack } from 'src/app/models/stack';
import { StackService } from 'src/app/services/stack.service'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-create-stack',
  templateUrl: './create-stack.component.html',
  styleUrls: ['./create-stack.component.css']
})
export class CreateStackComponent implements OnInit {
  @Input() stack?: Stack;
  @Output() stacksUpdatedEvent = new EventEmitter<Stack>();


  constructor(private stackService: StackService) { }

  ngOnInit(): void {
  }

  createStack(stack: Stack) {
    this.stackService.createStack(stack).subscribe();
    this.stacksUpdatedEvent.emit(stack);
    this.cancelStack()
  }

  cancelStack() {
    this.stack = undefined;
  }

}
