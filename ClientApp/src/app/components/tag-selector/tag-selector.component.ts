import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tags } from 'src/app/models/tags'

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements OnInit {
  @Output() tagEvent = new EventEmitter();
  tags: string[] = ["None", "History", "Science", "Math", "English", "Foreign Language"] ;
  @Input() tag: string = Tags.None;

  constructor() {}


  ngOnInit(): void {
  }

  selectedTag() {
    this.tagEvent.emit(this.tag)
  }

}
