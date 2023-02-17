import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Stack } from 'src/app/models/stack';
import { StackService } from 'src/app/services/stack.service'

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  @Output() selectedStackEvent = new EventEmitter<Stack>();
  stacks?: Stack[];
  selectedStack: Stack = new Stack; 
  isActiveStack = false;

  constructor(private stackService: StackService) { }

  ngOnInit(): void {
    this.stackService.getStacks().subscribe((result : Stack[]) => (this.stacks = result));
  }

  deleteStack(stack: Stack): void {
    this.stackService.deleteStack(stack).subscribe((result: Stack[]) => (this.stacks = result));
  }

  selectStack(stack: Stack): void {
    this.selectedStackEvent.emit(stack)
  }
}
