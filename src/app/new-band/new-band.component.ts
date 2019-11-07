import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
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
    members: new FormGroup({
			name: new FormControl(),
			nickname: new FormControl(),
			surname: new FormControl(),
			instruments: new FormControl()
		}),
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
		return this.http.post(this.bandUploadUrl,{band,token: this.auth.getToken()});
	}

}
