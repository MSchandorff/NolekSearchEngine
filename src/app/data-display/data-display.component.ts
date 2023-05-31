import { Component, OnInit } from '@angular/core';
import { DataTestService } from '../data-test-service.service';
import { PlcData }  from '../plc-data.model';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
  plcDataItems: PlcData[] = [];
  properties: string[] = ['TMP1', 'TMP2', 'B31', 'B32', 'B21', 'B22', 'P101', 'RegulatorSP', 'RegulatorFB'];
  selectedProperty: string | null = null;
  selectedDate: string | null = null;

  constructor(private dataTestService: DataTestService) { }

  ngOnInit(): void {
    this.fetchPlcData('2023-05-16');
  }

  selectProperty(property: string): void {
    this.selectedProperty = property;
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    this.fetchPlcData(date);
  }

  fetchPlcData(date: string): void {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6IjkzMzBhNjA3LTZiNjYtNDBmNS1iMTE1LTZjZWQwMmZkOGM4NyIsImVtYWlsIjoiYWRtaW5AVEVTVC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdhNjM5MmU5LTQ1M2EtNGU0Mi1iZjAyLWRiOGZhOTRjMDNjZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg1NTQzMjgzLCJpc3MiOiJJZGVudGl0eUFQSSIsImF1ZCI6IklkZW50aXR5QVBJVXNlciJ9.vU6SsVp-ezm2qeRcXLpQPdLCu4NR3y0u1e1y3_EZitU';
    const body = {
      index: `${date}-plc_testing-general`,
      query: `index:${date}-plc_testing-general`,
      size: 5000
    };

    this.dataTestService.postData(token, body).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          this.plcDataItems = response.result.map((item: any) => item as PlcData);
        } else {
          console.error(response.message);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  
  getPropertyKeys(): string[] {
    const firstItem = this.plcDataItems[0];
    return Object.keys(firstItem?.item ?? {});
  }
  
  getChartProperties(): string[] {
    return ['TMP1', 'TMP2', 'B31', 'B32'];
  }

  getChartData(property: string): any[] {
    if (!this.selectedProperty) {
      return [];
    }
  
    const chartData: { data: number[], label: string } = {
      data: [],
      label: this.selectedProperty
    };
  
    for (const item of this.plcDataItems) {
      const value = Number(item?.item?.[this.selectedProperty].replace(',', '.')) || 0;
      chartData.data.push(value);
    }
  
    return [chartData];
  }
  
  getChartLabels(): string[] {
    return this.plcDataItems.map((item: PlcData, index: number) => (index + 1).toString());
  }

  getChartOptions(): any {
    return {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        },
      },
      plugins: {
        legend: {
          onClick: null,
          display: true,
        },
      },
    };
  }
}
