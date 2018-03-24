import moment from 'moment';

const initialState = {
    searchText: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {...state, searchText: action.text};

    case 'SET_START_DATE':
      return {...state, startDate: action.startDate};

    case 'SET_END_DATE':
      return {...state, endDate: action.endDate};

    default:
    return state;
  }
};