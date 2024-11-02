import dayjs from 'dayjs';

type Props = {
  date: string;
}

export const PrettyDate = ({date}: Props) => <span>{dayjs(date).format('HH:mm:ss')}</span>
