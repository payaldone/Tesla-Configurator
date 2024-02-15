import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TeslaService } from '../../service/tesla.service';
import { Subscription } from 'rxjs';
import { Summary } from '../../model/step3_model';
import { Config, Options } from '../../model/step2_Model';
import { Image_URL } from '../../model/step1_model';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  private subscriptions: Subscription = new Subscription();
  public selectedCarOption!: Options;
  public selectedCarSummary!: Summary;
  public selectedCarConfig!: Config;
  public selectedCarImage: string = '';
  constructor(private teslaService: TeslaService) { }

  ngOnInit(): void {
    //get selected car data from step 1
    this.teslaService.getSummaryData().subscribe(response => {
      this.selectedCarSummary = response;
      this.selectedCarImage = `${Image_URL}/${this.selectedCarSummary?.code}/${this.selectedCarSummary?.color?.code}.jpg`
      this.subscriptions = this.teslaService.getConfig(this.selectedCarSummary.code).subscribe(data => {
        this.selectedCarOption = data;
        if (this.selectedCarSummary?.config?.description) {
          const matchingCarConfig = this.selectedCarOption?.configs?.find(config => config?.description === this.selectedCarSummary?.config?.description);
          if (matchingCarConfig) {
            this.selectedCarConfig = matchingCarConfig;
          }
        }
      })
    })
  }

  /**
   * @description Method to select/Change car config and selected data send to 
   * setSummaryData function for step 3 reference
   * @param configDescription 
   */
  onConfigChange(configDescription: string): void {
    const matchingCarConfig = this.selectedCarOption?.configs.find(config => config.description === configDescription);
    if (matchingCarConfig) {
      this.selectedCarConfig = matchingCarConfig;
      this.selectedCarSummary.config = this.selectedCarConfig;
      this.teslaService.setSummaryData(this.selectedCarSummary);
    }
  }

  /**
   * Method to checked/unchecked towHitch or yoke checkbox
   * @param event 
   * @returns 
   */
  onCheckChange(event: Event): void {
    const target = event?.target as HTMLInputElement;
    const { name, checked } = target;
    switch (name) {
      case 'towHitch':
        this.selectedCarSummary.towHitch = checked;
        break;
      case 'yoke':
        this.selectedCarSummary.yoke = checked;
        break;
      default:
        return;
    }
    this.teslaService.setSummaryData(this.selectedCarSummary);
  }

  /**
   * @description Method to Destroying Observable
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
