export const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
export const setTextFilter = (text='') => ({
  type: SET_TEXT_FILTER,
  text
});

export const SET_START_DATE = 'SET_START_DATE';
export const setStartDate = (startDate) => ({
  type: SET_START_DATE,
  startDate
});

export const SET_END_DATE = 'SET_END_DATE';
export const setEndDate = (endDate) => ({
  type: SET_END_DATE,
  endDate
});