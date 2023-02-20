import { Component, EventEmitter, OnInit, Output } from '@angular/core';

enum tags {
  None = "None",
  History = "Histoy",
  Math = "Math",
  Science = "Science",
  English = "English",
  ForeignLanguage = "Foreign Language"
}

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements OnInit {
  @Output() tagEvent = new EventEmitter();
  tag :string= tags.None;

  constructor() { }

  ngOnInit(): void {
  }

  selectedTag() {
    this.tagEvent.emit(this.tag)
  }

}
