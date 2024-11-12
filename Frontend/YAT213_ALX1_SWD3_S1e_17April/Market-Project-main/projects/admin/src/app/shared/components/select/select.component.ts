import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() title: string = "";
  @Input() categoryData: any[] = [];
  @Input() all: boolean = true;
  @Input() select:string = '';
  @Output() selectedValue = new EventEmitter;
  constructor() {

  }
  detectedValue(event: any) {
    return this.selectedValue.emit(event)
  }
}
