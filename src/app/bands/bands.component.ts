import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Band } from '../band';

@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.scss']
})
export class BandsComponent implements OnInit {
	private bandsUrl: string = '/api/bands';
	private bands: Band[];
	private chosenBand: Band | undefined = undefined;
  constructor(
		private auth: AuthorizationService,
		private router: Router,
		private http: HttpClient
	) { }

  ngOnInit() {
		if(!this.auth.isLogged()) {
			this.router.navigate(['/']);
		}
		this.getBands();
  }

	private getBands() {
		this.queryBands().subscribe(
			(bands: Band[]) => {
				this.bands = bands;
			},
			(err) => {
				console.error(err);
			}
		);
	}

	private queryBands() {
		return this.http.get(this.bandsUrl);
	}

	private showBand(current: Band){
		this.chosenBand = current;
	}

}
