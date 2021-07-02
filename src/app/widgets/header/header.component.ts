import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from 'src/services/api/identity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private identityService: IdentityService,
    private router: Router) { }

  ngOnInit() {
  }

  isLoggedIn() : boolean {    
    return this.identityService.isLoggedIn();
  }

  logout(): void {
    this.identityService.logout();
    this.router.navigateByUrl('sign-in');
  }
}
