import { Component } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any;

  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    this.httpClient.getData().subscribe((response) => {
      this.data = response;
    });
  }
}
