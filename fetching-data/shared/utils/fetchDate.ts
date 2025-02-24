import {REQUEST_URL} from '@/shared/constants';

export async function fetchDate() {
  console.log('start fetch data')
  await delay(3000);
  const data = await fetch(REQUEST_URL)
  const {dateTime} = await data.json()
  console.log('finish fetch data')
  return dateTime
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
