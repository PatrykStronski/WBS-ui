import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Band } from '../band';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-band',
  templateUrl: './new-band.component.html',
  styleUrls: ['./new-band.component.scss']
})
export class NewBandComponent implements OnInit {
	private bandUploadUrl: string = '/api/bands';

  bandForm = new FormGroup({
    name: new FormControl(),
    short_desc: new FormControl(),
    dateoffoundation: new FormControl(),
    members: new FormControl(),
    genere: new FormControl(),
  });

  constructor(
		private auth: AuthorizationService,
		private router: Router,
		private http: HttpClient
	) { }

  ngOnInit() {
		if(!this.auth.isLogged()){
			this.router.navigate(['/']);
		}
  }

	private validate(b: Band){
		if(b.members.indexOf(', ')===b.members.length-2){
			b.members = b.members.substr(0,b.members.length-2);
		}
	}

	private submitBand() {
		let formValue: Band = <Band><unknown>this.bandForm.value;
		this.sendSubmitBand(formValue).subscribe(
			(success) => {
				this.router.navigate(['/bands']);
			},
			(err) => {
				console.error(err);
			}
		);
	}

	private sendSubmitBand(band: Band){
		return this.http.post(this.bandUploadUrl,band);
	}

}
