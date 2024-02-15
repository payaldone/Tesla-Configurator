import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Model } from '../model/step1_model';
import { Options } from '../model/step2_Model';
import { Summary } from '../model/step3_model';


@Injectable({
  providedIn: 'root'
})
export class TeslaService {
  constructor(private http: HttpClient) { }

  /**
   * @description This subject created to get latest emmited value to subcriber. 
   */
  public summaryData = new BehaviorSubject<Summary>
    ({
      code: '',
      description: '',
      color: {
        code: '',
        description: '',
        price: 0
      },
      config: {
        id: 0,
        description: '',
        range: 0,
        price: 0,
        speed: 0
      },
      towHitch: false,
      yoke: false
    })

  /**
   * @description Method to get models data.
   * @returns response type of Model.
   */
  getModelData(): Observable<Model[]> {
    return this.http.get<Model[]>('/models');
  }

  /**
   * @description Method to get configs and options data.
   * @param modelCode 
   * @returns response type of Options.
   */
  getConfig(modelCode: string): Observable<Options> {
    return this.http.get<Options>(`/options/${modelCode}`);
  }

  /**
   * Method to set summary data
   * @param summaryData 
   */
  setSummaryData(summaryData: Summary) {
    this.summaryData.next(summaryData);
  }

  /**
   * @description Method to get summary data.
   * @returns response type of Summary.
   */
  getSummaryData() {
    return this.summaryData;
  }
}
