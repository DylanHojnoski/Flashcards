import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})


export class FiltersComponent implements OnInit {
  @Output() tagEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();
  tag :String = "None"
  searchInput = "";

  constructor() { }

  ngOnInit(): void {
  }

  filter(tag: String) {
    this.tagEvent.emit(tag);
  }

  search() {
    console.log("emit search");
    this.searchEvent.emit(this.searchInput);
  }

}
