import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Band } from '../../band';
import { AuthorizationService } from '../../authorization.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
	@Input() currentBand: Band | undefined = undefined;
  constructor(auth: AuthorizationService) { }

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
	}

}
