import moment from 'moment';

const dateRange = (data=[], startDate=0, endDate=0) => {
  return data.filter((item) => {
    const createdAtMoment = moment(item.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

    return startDateMatch && endDateMatch;
  }).sort((a,b) => {
    return a.createdAt < b.createdAt ? 1 : -1;
    });
};

export default dateRange;

