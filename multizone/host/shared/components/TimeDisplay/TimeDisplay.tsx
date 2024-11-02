import {PrettyDate} from '@/shared/components';
import {fetchDate} from '@/shared/utils';

export const TimeDisplay = async () => {
  const dateTime = await fetchDate()

  return <PrettyDate date={dateTime} />
}
