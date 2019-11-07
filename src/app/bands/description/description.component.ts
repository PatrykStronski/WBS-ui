import { Component, OnInit } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
import { Band } from '../../band';
import { AuthorizationService } from '../../authorization.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
	private delurl = '/api/delbands';
	@Input() currentBand: Band | undefined = undefined;
	@Output() deleteB = new EventEmitter();
	
  constructor(
		private auth: AuthorizationService,
		private http: HttpClient
	) { }

  ngOnInit() {
  }

	private isBand() {
		if(this.currentBand){
			return true;
		}
		return false;
	}

	private extractBandmembers(): string[] {

		return this.currentBand.members.map((member) => {
			let nick = member.nickname !== null ? member.nickname : '';
			return member.name+' '+ nick +' '+member.surname;
		});;
	}

	private deleteBand() {
		let id = this.currentBand.id;
		this.runDelete(this.currentBand.id)
		.subscribe(() => {
			this.currentBand = undefined;
			this.deleteB.emit(id);	
		});
	}

	private runDelete(bandId: number){
		return this.http.post(this.delurl,{
			token: this.auth.getToken(),
			band: bandId
		});
	}

}
