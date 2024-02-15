import { Component } from '@angular/core';
import { TeslaService } from '../../service/tesla.service';
import { Image_URL, Model } from '../../model/step1_model';
import { Summary } from '../../model/step3_model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {
  public modelsData!: Model[];
  public summary!: Summary;
  subscriptions: Subscription = new Subscription();
  public selectedModel!: Model;
  public selectedCarImage: string = '';
  constructor(private teslaService: TeslaService) { }

  ngOnInit(): void {
    this.subscriptions = this.teslaService.getModelData().subscribe(data => {
      this.modelsData = data;

      this.teslaService.getSummaryData().subscribe(response => {
        this.summary = response;
        if (this.summary?.code) {
          const matchingCarModel = this.modelsData?.find(carModel => carModel?.code === this.summary?.code);
          if (matchingCarModel) {
            this.selectedModel = matchingCarModel;
            this.selectedCarImage = this.createCarImageURL(this.summary?.code, this.summary?.color?.code);
          }
        }
      })
    })
  }

  /**
   * @description Method to select/change model and match with modelsData.Matched data stored in summary variable 
   *  and pass summary variable to setSummaryData for next steps2 and step3 reference.
   * @param modelCode 
   */
  onModelChange(modelCode: string) {
    const selectedCarModel = this.modelsData?.find(model => model.code === modelCode);
    if (selectedCarModel) {
      this.selectedModel = selectedCarModel;
      this.summary.code = this.selectedModel?.code;
      this.summary.description = this.selectedModel?.description;
      this.summary.color = this.selectedModel?.colors[0];
      this.summary.config = { id: 0, description: '', range: 0, price: 0, speed: 0 };
      this.summary.towHitch = false;
      this.summary.yoke = false;
      this.selectedCarImage = this.createCarImageURL(this.summary?.code, this.summary?.color?.code)
      this.teslaService.setSummaryData(this.summary);
    }
  }

  /**
   * @description Method to change color of selected car.
   * @param colorCode 
   */
  onColorChange(colorCode: string) {
    const selectedColor = this.selectedModel?.colors?.find(color => color.code === colorCode);
    this.selectedCarImage = this.createCarImageURL(this.selectedModel?.code, colorCode);
    if (selectedColor) {
      this.summary.color = selectedColor;
      this.teslaService.setSummaryData(this.summary);
    }
  }

  /**
   * 
   * @param carModelCode 
   * @param colorCode 
   * @returns It return selected car image 
   */
  createCarImageURL(carModelCode: string, colorCode: string) {
    // Sanitize input parameters to prevent potential security vulnerabilities
    const sanitizedCarModelCode = encodeURIComponent(carModelCode);
    const sanitizedColorCode = encodeURIComponent(colorCode);
    // Construct the URL using template literals
    return `${Image_URL}/${sanitizedCarModelCode}/${sanitizedColorCode}.jpg`;
  }

  /**
   * @description Method to Destroying Observable
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}