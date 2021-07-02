import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistryModel } from 'src/models/registry-model';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value as RegistryModel);
    }
  }

  /**
   * Геттер для контроллов формы (делаем запись в html более короткой).
   */
  get f() {
    return this.form.controls;
  }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter<RegistryModel>();
  @Output() backToLoginEM = new EventEmitter();
}
