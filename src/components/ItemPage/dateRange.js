import moment from 'moment';

const dateRange = (data=[], startDate=0, endDate=0) => {
  return data.filter((item) => {
    const createdAtMoment = moment.utc(item.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

    return startDateMatch && endDateMatch;
  }).sort((a,b) => {
    return a.createdAt < b.createdAt ? 1 : -1;
    });
};

const timeConverter = (UNIX_timestamp) => {
  let a = new Date(UNIX_timestamp);
  let months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = `${year} ${month} ${date}`;
  return time;
}

export default dateRange;
export {timeConverter};
