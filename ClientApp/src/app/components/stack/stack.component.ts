import { Component, OnInit } from '@angular/core';
import { Stack } from 'src/app/models/stack';
import { StackService } from 'src/app/services/stack.service'

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {
  stacks?: Stack[];
  activeStack: Stack = new Stack; 
  isActiveStack = false;

  constructor(private stackService: StackService) { }

  ngOnInit(): void {
    this.stackService.getStacks().subscribe((result : Stack[]) => (this.stacks = result));
  }

  deleteStack(stack: Stack): void {
    this.stackService.deleteStack(stack).subscribe((result: Stack[]) => (this.stacks = result));
    console.log("delete")
  }

  setActiveStack(stack: Stack): void {
    this.activeStack = stack;
    this.isActiveStack = true
    console.log("hi")
  }

}
