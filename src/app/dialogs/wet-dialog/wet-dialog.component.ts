import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WetController } from 'src/models/wet-controller';

@Component({
  selector: 'app-wet-dialog',
  templateUrl: './wet-dialog.component.html',
  styleUrls: ['./wet-dialog.component.css']
})
export class WetDialogComponent implements OnInit, OnDestroy {
 
  @Input() loading: boolean = false;
  @Input() dialogTitle: string = '';
  @Input() cancelButtonLabel: string = 'Cancel';
  @Input() submitButtonLabel: string = 'Submit';
  @Input() wetModel: WetController = new WetController();

  @Output() cancelButtonEM = new EventEmitter();
  @Output() submitButtonEM = new EventEmitter<WetController>();

  form: FormGroup;

  constructor() { 
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.cancelButtonEM.unsubscribe();
    this.submitButtonEM.unsubscribe();
  }

  ngOnInit() {
  }

  cancel(): void {
    this.cancelButtonEM.emit();
  }

  submit(): void {
    if (this.form.invalid) return;
    let model = this.form.value as WetController;
    model.id = this.wetModel.id;
    this.submitButtonEM.emit(model);
  }

  get f() {
    return this.form.controls;
  }

  set wet(model: WetController) {
    this.wetModel = model;
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.wetModel.name),
      reportIntervalSeconds: new FormControl(this.wetModel.reportIntervalSeconds),
      bottomWetEdge: new FormControl(this.wetModel.bottomWetEdge),
      upperWetEdge: new FormControl(this.wetModel.upperWetEdge)
    });
  }
}
