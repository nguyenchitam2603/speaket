export class Engineer {
  dateOfBirth: string;

  constructor(public firstName: string = '',
    public lastName: string = '',
    public middleName: string = '',
    day: string = '',
    month: string = '',
    year: string = '',
    public job: string = '') {
      // this.dateOfBirth = `${month}/${day}/${year}` ;
      this.dateOfBirth = '11/11/2011'
  }
}
