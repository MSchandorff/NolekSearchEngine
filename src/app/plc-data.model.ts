export class PlcData {
    id?: string;
    index?: string;
    creationDateTime?: string;
    item?: {
      LogTime: string;
      StepNo: string;
      CircuitName: string;
      TMP1: string;
      TMP2: string;
      B31: string;
      B32: string;
      B21: string;
      B22: string;
      P101: string;
      RegulatorSP: string;
      RegulatorFB: string;
      [key: string]: string;
    };
  }

  export class PlcBundle {
    index?: string;
    dataPoints?: PlcData[];
  }
  