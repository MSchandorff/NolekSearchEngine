import { Component, OnInit } from '@angular/core';
import { DataTestService } from '../data-test-service.service';
import { Observable, forkJoin } from 'rxjs';
import { PlcData, PlcBundle } from '../plc-data.model';

@Component({
  selector: 'app-index-list',
  templateUrl: './index-list.component.html',
  styleUrls: ['./index-list.component.css']
})
export class IndexListComponent implements OnInit {
  indexes: PlcBundle[] = [];
  selected: PlcBundle | null = null;
  startDate = '2023-05-16';
  endDate = '2023-05-25';
  plcDataItems: PlcData[] = [];

  constructor(private dataTestService: DataTestService) { }

  ngOnInit(): void {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjU5NTk4YThhLTk4ZGYtNDA0MS05Mzg3LTBiNTA1MjNkYjhiZCIsImVtYWlsIjoiYWRtaW5AVEVTVC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdhNjM5MmU5LTQ1M2EtNGU0Mi1iZjAyLWRiOGZhOTRjMDNjZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg1MTExNzQyLCJpc3MiOiJJZGVudGl0eUFQSSIsImF1ZCI6IklkZW50aXR5QVBJVXNlciJ9.icerrNAzeanPsUts6UFLTneac4l3EXuO1TG6KNFJb1M';
    
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    const dates = [];
    while (startDate <= endDate) {
      dates.push(this.formatDate(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }

    const requests = dates.map(date => {
      const body = {
        index: `${date}-plc_testing-general`,
        query: `index:${date}-plc_testing-general`,
        size: 5000
      };
      return this.dataTestService.fetchIndexes(token, body) as Observable<PlcBundle>;
    });

    forkJoin(requests).subscribe(
      (responses: PlcBundle[]) => {
        console.log('API Responses:', responses); // Check received responses
        this.indexes = responses;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  selectIndex(index: PlcBundle): void {
    this.selected = index;

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjU5NTk4YThhLTk4ZGYtNDA0MS05Mzg3LTBiNTA1MjNkYjhiZCIsImVtYWlsIjoiYWRtaW5AVEVTVC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdhNjM5MmU5LTQ1M2EtNGU0Mi1iZjAyLWRiOGZhOTRjMDNjZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg1MTExNzQyLCJpc3MiOiJJZGVudGl0eUFQSSIsImF1ZCI6IklkZW50aXR5QVBJVXNlciJ9.icerrNAzeanPsUts6UFLTneac4l3EXuO1TG6KNFJb1M';

    const body = {
      index: `${this.selected.index}-plc_testing-general`,
      query: `index:${this.selected.index}-plc_testing-general`,
      size: 5000
    };

    this.dataTestService.postData(token, body).subscribe(
      (plcDataItems: PlcData[]) => {
        this.plcDataItems = plcDataItems;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
