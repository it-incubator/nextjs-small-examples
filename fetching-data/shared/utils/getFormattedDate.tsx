import dayjs from 'dayjs';

export const getFormattedDate = (date: string) => dayjs(date).format('HH:mm:ss');

export const PrettyDate = ({date}: {date: string}) => {
    return <span>{
        dayjs(date).format('HH:mm:ss')}
        </span>
}
