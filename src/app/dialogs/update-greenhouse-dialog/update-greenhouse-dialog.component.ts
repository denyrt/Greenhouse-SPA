import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateGreenhouseModel } from 'src/models/create-greenhouse-model';
import { GreenhousesService } from 'src/services/api/greenhouses.service';
import { GreenhousesRepositoryService } from 'src/services/data/greenhouses-repository.service';
import { CreateGreenhouseDialogComponent } from '../create-greenhouse-dialog/createGreenhouseDialog.component';

@Component({
  selector: 'app-update-greenhouse-dialog',
  templateUrl: './update-greenhouse-dialog.component.html',
  styleUrls: ['./update-greenhouse-dialog.component.css']
})
export class UpdateGreenhouseDialogComponent implements OnInit {
  private cancelled: boolean = false;
  formDisabled: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<CreateGreenhouseDialogComponent>,
    private repository: GreenhousesRepositoryService,
    private greenhousesService: GreenhousesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

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

    this.greenhousesService.update(this.data.id, model)
      .subscribe((updated) => {
        this.repository.update(updated);
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

class DialogData {
  id: string = '';
}