import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
	private token: string;
	private loginRoute: string = "/api/auth";
	private logoffRoute: string = "/api/logoff";
	
  constructor(
		private http: HttpClient
	) { }

	public isLogged() {
		if(!this.token) return false;
		return true;
	}

	auth(user: string, pass: string) {
		return new Promise((res,rej) => {
			this.sendAuthReq(user, pass).subscribe(
				(token: any) => {
					this.token = token.token;
					res();
				},
				(err) => {
					console.error(err);
					rej();
				}
			)
		});
	}

	logOff() {
		return new Promise((res,rej) => {
			this.sendLogOffReq().subscribe(
				(req) => {
					if(req.status === 200) {
						this.token = undefined;
						res();
					} else {
						rej();
					}
				},
				() => {
					rej();
				}
			);
		});
	}
	
	private sendAuthReq(user: string, pass: string) {
		return this.http.post<string>(this.loginRoute,
			{user, pass} 
    );
	}

	private sendLogOffReq() {
		return this.http.post(this.logoffRoute,
			{token: this.token}
    );
	}

}
