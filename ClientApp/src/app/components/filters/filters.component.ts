import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})


export class FiltersComponent implements OnInit {
  @Output() tagEvent = new EventEmitter();
  tag :String = "None"

  constructor() { }

  ngOnInit(): void {
  }

  filter(tag: String) {
    this.tagEvent.emit(tag);
  }

}
