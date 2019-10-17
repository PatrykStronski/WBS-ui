import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Band } from '../../band';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
	@Input() currentBand: Band | undefined = undefined;
  constructor() { }

  ngOnInit() {
  }

	private isBand() {
		if(this.currentBand){
			return true;
		}
		return false;
	}

	private extractBandmembers(): string[] {
		return this.currentBand.members.split(', ');
	}

}
