import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LightingController } from 'src/models/lighting-controller';

@Component({
  selector: 'app-light-dialog',
  templateUrl: './light-dialog.component.html',
  styleUrls: ['./light-dialog.component.css']
})
export class LightDialogComponent implements OnInit, OnDestroy {

  @Input() loading: boolean = false;
  @Input() dialogTitle: string = '';
  @Input() cancelButtonLabel: string = 'Cancel';
  @Input() submitButtonLabel: string = 'Submit';
  @Input() lightModel: LightingController = new LightingController();

  @Output() cancelButtonEM = new EventEmitter();
  @Output() submitButtonEM = new EventEmitter<LightingController>();

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
    let model = this.form.value as LightingController;
    model.id = this.lightModel.id;
    console.log(model);
    this.submitButtonEM.emit(model);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(this.lightModel.name),
      reportIntervalSeconds: new FormControl(this.lightModel.reportIntervalSeconds),
      permissibleLightValue: new FormControl(this.lightModel.permissibleLightValue),
      lightingSeconds: new FormControl(this.lightModel.lightingSeconds)
    });
  }

  get f() {
    return this.form.controls;
  }

  set light(model: LightingController) {
    this.lightModel = model;
    this.form = this.createForm();
  }
}
