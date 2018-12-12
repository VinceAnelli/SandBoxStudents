import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-gfi-input',
  templateUrl: './gfi-input.component.html',
  styleUrls: ['./gfi-input.component.css']
})
export class GfiInputComponent implements OnInit {
  @Input() typeChamp: string;
  @Input() hideRequiredMarker: boolean;
  formGroup: FormGroup;
  formControl: FormControl;
  @Input() name: string;


  propagateChange = (_: any) => {};

  constructor(
    private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer) {
      this.formGroup = <FormGroup>this.controlContainer.control;
    } else {
      throw Error('Can\'t find parent FormGroup directive');
    }
    this.formControl = <FormControl>this.formGroup.get(this.name);
    if (!this.formControl) {
      throw Error('Can\'t find FormControl ' + this.name);
    }
  }
}
