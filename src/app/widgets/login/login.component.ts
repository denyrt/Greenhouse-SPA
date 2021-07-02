import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginModel } from 'src/models/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
  
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      let loginModel = new LoginModel();
      loginModel.username = this.form.value.username;
      loginModel.password = this.form.value.password;
      this.submitEM.emit(loginModel);
    }
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter<LoginModel>();
  @Output() createAccountEM = new EventEmitter();
}
