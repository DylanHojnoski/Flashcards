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
  stackToEdit?: Stack;
  stacks?: Stack[];
  selectedStack: Stack = new Stack; 
  isActiveStack = false;
  selectedTag: String = "None"
  editActive: boolean = false;

  constructor(private stackService: StackService) { }

  ngOnInit(): void {
    this.stackService.getStacks().subscribe((result : Stack[]) => (this.stacks = result));
  }

  deleteStack(stack: Stack): void {
    this.stackService.deleteStack(stack).subscribe((result: Stack[]) => (this.stacks = result));
  }

  selectStack(stack: Stack): void {
    if (!this.editActive) {
      this.selectedStackEvent.emit(stack)
    }
  }

  saveStack(stack: Stack) {
    if (stack.name == undefined) {
      return;
    }
    this.stackService.upateStack(stack).subscribe(result => this.stacks = result);
    this.editActive = false;
  }

  setTag(tag: String) {
    this.selectedTag = tag;
  }

  addStack(stack: Stack) {
    this.stacks?.push(stack);
  }

  editStacks() {
    this.editActive = true;
  }

  createStack() {
    this.stackToEdit = new Stack;
  }
}
