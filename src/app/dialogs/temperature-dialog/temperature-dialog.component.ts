import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TemperatureController } from 'src/models/temperature-controller';

@Component({
  selector: 'app-temperature-dialog',
  templateUrl: './temperature-dialog.component.html',
  styleUrls: ['./temperature-dialog.component.css']
})
export class TemperatureDialogComponent implements OnInit, OnDestroy {

  @Input() loading: boolean = false;
  @Input() dialogTitle: string = '';
  @Input() cancelButtonLabel: string = 'Cancel';
  @Input() submitButtonLabel: string = 'Submit';
  @Input() temperatureModel: TemperatureController = new TemperatureController();

  @Output() cancelButtonEM = new EventEmitter();
  @Output() submitButtonEM = new EventEmitter<TemperatureController>();

  form: FormGroup = new FormGroup({
    name: new FormControl(this.temperatureModel.name),
    reportIntervalSeconds: new FormControl(this.temperatureModel.reportIntervalSeconds),
    celsiusToStartAeration: new FormControl(this.temperatureModel.celsiusToStartAeration),
    celsiusToFinishAeration: new FormControl(this.temperatureModel.celsiusToFinishAeration),
    celsiusToStartHeating: new FormControl(this.temperatureModel.celsiusToStartHeating),
    celsiusToFinishHeating: new FormControl(this.temperatureModel.celsiusToFinishHeating),
    bottomEdgeToAlert: new FormControl(this.temperatureModel.bottomEdgeToAlert),
    upperEdgeToAlert: new FormControl(this.temperatureModel.upperEdgeToAlert)
  });

  constructor() { }

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
    let model = this.form.value as TemperatureController;
    model.id = this.temperatureModel.id;
    this.submitButtonEM.emit(model);
  }

  set temperature(model: TemperatureController) {
    this.temperatureModel = model;
    this.form = new FormGroup({
      name: new FormControl(this.temperatureModel.name),
      reportIntervalSeconds: new FormControl(this.temperatureModel.reportIntervalSeconds),
      celsiusToStartAeration: new FormControl(this.temperatureModel.celsiusToStartAeration),
      celsiusToFinishAeration: new FormControl(this.temperatureModel.celsiusToFinishAeration),
      celsiusToStartHeating: new FormControl(this.temperatureModel.celsiusToStartHeating),
      celsiusToFinishHeating: new FormControl(this.temperatureModel.celsiusToFinishHeating),
      bottomEdgeToAlert: new FormControl(this.temperatureModel.bottomEdgeToAlert),
      upperEdgeToAlert: new FormControl(this.temperatureModel.upperEdgeToAlert)
    });
  }

  get f() {
    return this.form.controls;
  }
}
