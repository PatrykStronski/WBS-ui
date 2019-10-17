import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
		private router: Router,
		private auth: AuthorizationService
	) { }

  ngOnInit() {
  }

	loggedIn(): boolean {
		return this.auth.isLogged();
	}

	async logOff() {
		await this.auth.logOff();
		this.router.navigate(['/']);
	}

}
