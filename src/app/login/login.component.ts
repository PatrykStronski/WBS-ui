import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	invalidCredentials: boolean = false;
  constructor(
		private auth: AuthorizationService,
		private router: Router,
	) { }
	
  loginForm = new FormGroup({
    login: new FormControl(),
    pass: new FormControl(),
  });

  ngOnInit() {
		if(this.auth.isLogged()){
			this.router.navigate(['/bands']);
		}
  }

	async authorize() {
		let formValue = this.loginForm.value;
		let login: string = formValue.login;
		let pass: string = formValue.pass;
		this.auth.auth(login, pass)
		.then(() => {
			this.router.navigate(['/bands']);
		})
		.catch(() => {
			this.invalidCredentials = true;
			setTimeout(() => {
				this.invalidCredentials = false;
			},1000);
		});
	}

}
