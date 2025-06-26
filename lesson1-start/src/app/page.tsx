'use client'
import styles from "./page.module.css";
import {useEffect, useState} from "react";

export default function Home() {
    console.log('Home rendered')

    const [counter, setCounter] = useState(10);

    useEffect(() => {
        alert('hello')
    }, [])

    return (
    <div className={styles.page}>
     Hello
        <button onClick={() => {
            setCounter(counter + 1)
        }}>click me {counter}</button>
    </div>
  );
}
