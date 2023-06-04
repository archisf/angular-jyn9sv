function dateRange(startDate, endDate, steps = 1): Date[] {
  const dateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }
  return dateArray;
}

const fieldNames = ['workerName', 'zero', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

const subFieldNames = {
  0: 'zero.ShiftName',
  1: 'first.ShiftName',
  2: 'second.ShiftName',
  3: 'third.ShiftName',
  4: 'fourth.ShiftName',
  5: 'fifth.ShiftName',
  6: 'sixth.ShiftName',
};

export { dateRange, fieldNames, subFieldNames };

