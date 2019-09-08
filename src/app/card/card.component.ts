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
  public rateArray: string[];
  public errorMsg: string;
  public rateNew: string;
  public rateCurrency: string;
  public rateRefreshDate: string;
  public rateStored: string[];
	
  constructor(private alphaVantageService: AlphaVantageService) {
  }

  ngOnInit() {
      this.alphaVantageService.get(this.currency).subscribe(result => {

      this.errorMsg = result['Error Message']

      this.rateNew = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            
      if(typeof result['Error Message'] === "undefined" && this.rateNew != "")
      {
        localStorage.setItem(result['Realtime Currency Exchange Rate']['3. To_Currency Code'], JSON.stringify(result['Realtime Currency Exchange Rate']));
        //this.rate = this.rateNew;
        //this.rateCurrency = result['Realtime Currency Exchange Rate']['4. To_Currency Name'];
        //this.rateRefreshDate  = result['Realtime Currency Exchange Rate']['6. Last Refreshed'];
        //this.rateNew = '';
      }
  
        //alert(result['Error Message']);
        this.rateStored = JSON.parse(localStorage.getItem(this.currency));
        //alert( this.rateStored['5. Exchange Rate']);
        this.rate = this.rateStored['5. Exchange Rate'];
        this.rateCurrency = this.rateStored['4. To_Currency Name'];
        this.rateRefreshDate  = this.rateStored['6. Last Refreshed'] + " " +this.rateStored['7. Time Zone']; //'7. Time Zone' ;
        his.rateNew = '';
      
    });
  }

}
