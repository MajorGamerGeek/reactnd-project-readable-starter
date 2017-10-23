import moment from 'moment';

export const formatDate = (date) => moment(new Date(date)).format('YYYY-MM-DD');