import { Component } from '@angular/core';
import { Summary } from '../../model/step3_model';
import { TeslaService } from '../../service/tesla.service';
import { Image_URL } from '../../model/step1_model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
public summary! : Summary;
public selectedCarImage: string ='';
public totalCost!: number;

constructor(private teslaService: TeslaService){}

ngOnInit(): void{
this.teslaService.getSummaryData().subscribe(response=> {
  this.summary = response;
  console.log("test",this.summary);
  this.selectedCarImage = `${Image_URL}/${this.summary?.code}/${this.summary?.color?.code}.jpg`
  this.getTotalCost();
})
}

/**
 * Method to get total cost of car
 */
getTotalCost():void{
const baseCost = (this.summary?.config?.price ?? 0) + (this.summary?.color?.price ?? 0);
const additionalCost = this.calculateAdditionalCost();
this.totalCost = baseCost + additionalCost;
console.log(this.totalCost)
}

/**
 * @description Method to calculate additional cost 
 * @returns additionalCost
 */ 
calculateAdditionalCost(): number{
let additionalCost = 0 ;
if(this.summary?.towHitch && this.summary?.yoke){
  additionalCost = 2000;
}else if(this.summary.towHitch || this.summary.yoke){
additionalCost = 1000;
}
return additionalCost;
}
}
