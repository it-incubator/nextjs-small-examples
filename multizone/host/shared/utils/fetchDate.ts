import {REQUEST_URL} from '@/shared/constants';

export async function fetchDate() {
  const data = await fetch(REQUEST_URL)
  const {dateTime} = await data.json()

  return dateTime
}
