import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeslaService } from './service/tesla.service';
import { Summary } from './model/step3_model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public summary!: Summary
  constructor(private teslaService: TeslaService) { }

  ngOnInit(): void {
    //get summary data to disabled route
    this.teslaService.getSummaryData().subscribe(data => {
      this.summary = data;
    })
  }

}
