import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() title: string = "";
  @Input() data: any[] = [];
  @Output() selectedValue = new EventEmitter;
  constructor() {

  }
  detectedValue(event: any) {
    return this.selectedValue.emit(event)
  }
}
