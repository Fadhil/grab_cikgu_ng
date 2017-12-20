
export class Subject {
  constructor(
    public id: number,
    public name: string,
    public levels: any
  ) {}
}

export const Subjects = [
  new Subject(0, 'Bahasa Malaysia', [true, true, true, true]),
  new Subject(1, 'Bahasa Inggeris', [true, true, true, true]),
  new Subject(2, 'Bahasa Cina', [true, true, true, true]),
  new Subject(3, 'Mathematics', [true, true, true, true]),
  new Subject(4, 'Science', [true, true, true, true]),
  new Subject(5, 'Geography', [false, false, true, true]),
  new Subject(6, 'History', [false, false, true, true]),
  new Subject(7, 'Accounts', [false, false, true, true]),
  new Subject(8, 'Economics', [false, false, false, true]),
  new Subject(9, 'Business', [false, false, false, true]),
  new Subject(10, 'Biology', [false, false, false, true]),
  new Subject(11, 'Physics', [false, false, false, true]),
  new Subject(12, 'Chemistry', [false, false, false, true]),
  new Subject(13, 'Add Math', [false, false, false, true]),
];

export const Levels = [
  'Standard (1-3)',
  'Standard (4-6)',
  'Form (1-3)',
  'Form (4-5)'
];
