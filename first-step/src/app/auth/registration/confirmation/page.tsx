'use client'
import {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store/store';
import {decrement, increment} from '@/features/counter/counterSlice';
import {useSearchParams} from 'next/navigation';

export default function Confirmation() {
  //const [count, setCount] = useState(0)
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('request')
  }, [])

  return (
      <div>
        Confirm registration
        <Suspense>
          <ConfirmCodeVerification/>
        </Suspense>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
  )
}

function ConfirmCodeVerification() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  return <div> code: {code}</div>
}
