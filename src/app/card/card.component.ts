import { Component, OnInit, Input } from '@angular/core';
import { AlphaVantageService } from '../alpha-vantage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {


  @Input()
  public currency: string;

  public rate: string;
  public errorMsg: string;
  public rateCurrency: string;
  public rateRefreshDate: string;
  public rateStored: string[];
	
  constructor(private alphaVantageService: AlphaVantageService) {
  }

  ngOnInit() {
      this.alphaVantageService.get(this.currency).subscribe(result => {

        this.errorMsg = result['Error Message'];//get anything in the api error Message

        this.rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];//lets get any value stored in the api return

        //if there is no error message and there is a value in the rate 
        if(typeof result['Error Message'] === "undefined" && this.rate != "")
        {
          // lets store the latest data in to localStorage
          localStorage.setItem(result['Realtime Currency Exchange Rate']['3. To_Currency Code'], JSON.stringify(result['Realtime Currency Exchange Rate']));
        }
        //pull the data from localstorage to use for display this data will always be the latest no error pull for the Currency 
        this.rateStored = JSON.parse(localStorage.getItem(this.currency));
        this.rate = this.rateStored['5. Exchange Rate'];
        this.rateCurrency = this.rateStored['4. To_Currency Name'];
        this.rateRefreshDate  = this.rateStored['6. Last Refreshed'] + " " + this.rateStored['7. Time Zone'];
    
    });
  }
}
