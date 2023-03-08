import { Stack } from 'src/app/models/stack';
import { StackService } from 'src/app/services/stack.service'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';


@Component({
    selector: 'app-create-stack',
    templateUrl: './create-stack.component.html',
    styleUrls: ['./create-stack.component.css']
})

export class CreateStackComponent implements OnInit {
    @Input() stack?: Stack;
    @Output() stacksUpdatedEvent = new EventEmitter<Stack[]>();


    constructor(private stackService: StackService, private userService: UserService) { }

    ngOnInit(): void {
    }

    async createStack(stack: Stack): Promise<Stack[]> {
        let user = new User;
        this.userService.GetCurrentUser().subscribe(async result =>  user = await result);
        
        return new Promise<Stack[]>(resolve => {
            this.stackService.createStack(stack).subscribe(results => {
                results = results.filter(stacks => stacks.userId == user.id);
                resolve(results);
            })

        })
    }

    async updateStacks(stack: Stack) {
        let newStacks = await this.createStack(stack);
        this.stacksUpdatedEvent.emit(newStacks);
        this.cancelStack()
    }



    cancelStack() {
        this.stack = undefined;
    }

}
