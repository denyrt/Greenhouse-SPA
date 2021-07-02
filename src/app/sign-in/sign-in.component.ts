import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/models/loginModel';
import { RegistryModel } from 'src/models/registry-model';
import { IdentityService } from 'src/services/api/identity.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginMode = true;
  waitResponse = false;
  constructor(private identity: IdentityService,
    private router: Router) { }

  ngOnInit() {
  }

  public switchMode() {    
    this.loginMode = !this.loginMode;
  }

  public login(loginModel: LoginModel): void {
    this.waitResponse = true;
    this.identity.login(loginModel)
      .subscribe(() => {
        this.router.navigateByUrl('greenhouses');
      }, () => {
        alert('Invalid login or password.');
      })
      .add(() => this.waitResponse = false);
  }

  public registry(registryModel: RegistryModel): void {
    this.waitResponse = true;
    this.identity.registry(registryModel)
      .subscribe(() => {
        this.router.navigateByUrl('sign-in');
        this.switchMode();
        alert('Success registry');
      },
      () => {
        alert('Something went wrong.');
      })
      .add(() => this.waitResponse = false);
  }
}
