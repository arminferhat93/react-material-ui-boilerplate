import getCurrentDate from './getCurrentDate';

describe('getCurrentDate', () => {
  const RealDate = Date;

  function mockDate(isoDate: string) {
    // @ts-ignore
    global.Date = class extends RealDate {
      constructor() {
        super();
        return new RealDate(isoDate);
      }
    };
  }

  afterEach(() => {
    global.Date = RealDate;
  });

  it('should return date in MM-DD-YYYY format for double-digit month and day', () => {
    mockDate('2020-11-20T10:20:30Z');
    expect(getCurrentDate()).toBe('11-20-2020');
  });

  it('should return date in MM-DD-YYYY format and pad single-digit month and day', () => {
    mockDate('2020-02-08T10:20:30Z');
    expect(getCurrentDate()).toBe('02-08-2020');
  });
});