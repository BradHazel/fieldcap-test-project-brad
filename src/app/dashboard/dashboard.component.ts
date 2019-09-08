import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AlphaVantageService } from '../alpha-vantage.service';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private subscription: Subscription;

	@Input() SearchDate: moment.Moment = moment();
	@Input() ElapsTime: number = 1;
  public currencies = ['CAD', 'JPY', 'EUR'];
  searchEndDate: moment.Moment;
	remainingTime: number;
	minutes: number;
	seconds: number;

	everySecond: Observable<number> = timer(0, 1000);

    constructor( private ref: ChangeDetectorRef) {
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
  }

  ngOnInit() {
 
    this.subscription = this.everySecond.subscribe((seconds) => {
			var currentTime: moment.Moment = moment();
			this.remainingTime = this.searchEndDate.diff(currentTime)
			this.remainingTime = this.remainingTime / 1000;

			if (this.remainingTime <= 0) {
				this.SearchDate = moment();
				this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");

        this.refresh()
			}
			else {
				this.minutes = Math.floor(this.remainingTime / 60);
				this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
			}
			this.ref.markForCheck()
		})
  }
  ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
  refresh(): void {
    window.location.reload();
}

}
