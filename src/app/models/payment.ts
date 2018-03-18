export class Payment {
  amount: number;
  remark: string;
  date: Date;
  type: string;

  constructor() {
    this.date = new Date();
  }
}
