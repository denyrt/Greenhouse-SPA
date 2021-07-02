import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Greenhouse } from 'src/models/greenhouse';
import { ReportsFilter } from 'src/models/reports-filter';

@Component({
  selector: 'app-reports-data-form',
  templateUrl: './reports-data-form.component.html',
  styleUrls: ['./reports-data-form.component.css']
})
export class ReportsDataFormComponent implements OnInit {

  @Input() isLoading: boolean = false;
  @Input() greenhouses: Greenhouse[] = [];
  @Output() loadButtonEM = new EventEmitter<ReportsFilter>();

  public form: FormGroup = new FormGroup({
    greenhouseId: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    startTime: new FormControl('00:00:01'),
    endTime: new FormControl('23:59:59')
  });

  constructor() { }

  ngOnInit() {
  
  }

  loadClick() {
    if (this.form.invalid) return;
    
    let startDateTime = new Date(`${this.form.value.startDate} ${this.form.value.startTime}`);
    let endDateTime = new Date(`${this.form.value.endDate} ${this.form.value.endTime}`);
    
    if (startDateTime > endDateTime) {
      alert("Стартовая дата и время не могут быть больше конечной даты и времени");
      return;
    }

    let reportFilter = new ReportsFilter();
    reportFilter.greenhouseId = this.form.value.greenhouseId;
    reportFilter.startDate = startDateTime.toISOString();
    reportFilter.endDate = endDateTime.toISOString();
    this.loadButtonEM.emit(reportFilter);
  }
}
