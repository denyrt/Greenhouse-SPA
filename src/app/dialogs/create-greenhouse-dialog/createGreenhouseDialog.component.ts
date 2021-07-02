import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateGreenhouseModel } from 'src/models/create-greenhouse-model';
import { GreenhousesService } from 'src/services/api/greenhouses.service';
import { GreenhousesRepositoryService } from 'src/services/data/greenhouses-repository.service';

@Component({
  selector: 'app-createGreenhouseDialog',
  templateUrl: './createGreenhouseDialog.component.html',
  styleUrls: ['./createGreenhouseDialog.component.css']
})
export class CreateGreenhouseDialogComponent implements OnInit { 
  private cancelled: boolean = false;
  formDisabled: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<CreateGreenhouseDialogComponent>,
    private repository: GreenhousesRepositoryService,
    private greenhousesService: GreenhousesService) {}

  ngOnInit() {}

  onCancel() {
    this.cancelled = true;
    this.dialogRef.close();
  }

  onSubmit() {    
    if (!this.form.valid) {
      return;
    }
    
    this.dialogRef.disableClose = true;
    this.formDisabled = true;

    var model = new CreateGreenhouseModel();
    model.name = this.form.value.name;

    this.greenhousesService.create(model)
      .subscribe((created) => {
        this.repository.add(created);
        this.dialogRef.close();
      })
      .add(() => {
        this.formDisabled = false;
        this.dialogRef.disableClose = false;
      })
  }

  get isCancelled() {
    return this.cancelled;
  }

  get f() {
    return this.form.controls;
  }
}
