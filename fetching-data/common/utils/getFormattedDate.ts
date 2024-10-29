import dayjs from 'dayjs';

export const getFormattedDate = (date: string) => dayjs(date).format('HH:mm:ss');
