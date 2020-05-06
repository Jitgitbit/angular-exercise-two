import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() featureSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }
}
