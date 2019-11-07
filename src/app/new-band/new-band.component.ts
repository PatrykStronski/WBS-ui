import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Band } from '../band';
import { Member } from '../member';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-band',
  templateUrl: './new-band.component.html',
  styleUrls: ['./new-band.component.scss']
})
export class NewBandComponent implements OnInit {
	private bandUploadUrl: string = '/api/bands';
	private mbmNumber = 1;

  bandForm = new FormGroup({
    name: new FormControl(),
    short_desc: new FormControl(),
    dateoffoundation: new FormControl(),
		mbm_name: new FormControl(),
		mbm_nickname: new FormControl(),
		mbm_surname: new FormControl(),
		mbm_instrument: new FormControl(),
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
		let formValue = this.bandForm.value;
		formValue.members = this.extractMembers({
			name: formValue.mbm_name, 
			nickname: formValue.mbm_nickname,
			surname: formValue.mbm_surname,
			instrument: formValue.mbm_instrument
		});
		delete formValue.mbm_name;
		delete formValue.mbm_nickname;
		delete formValue.mbm_surname;
		delete formValue.mbm_instrument;
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

	private extractMembers(obj: any):Member[] {
		let members: Member[] = [];
		obj.name = obj.name.split(',');
		obj.nickname = obj.nickname.split(',');
		obj.surname = obj.surname.split(',');
		obj.instrument = obj.instrument.split(',');
		let nmb = Math.min(...[obj.name.length, obj.nickname.length, obj.surname.length, obj.instrument.length]);
		for (let i = 0; i< nmb; i++) {
			let member: Member = { 
				name: obj.name[i],
				surname: obj.surname[i],
				nickname: obj.nickname[i],
				instrument: obj.instrument[i],
			}
			members.push(member);
		}
		return members;
	}

}
