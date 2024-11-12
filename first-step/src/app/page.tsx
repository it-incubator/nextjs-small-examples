'use client'
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      hello
        <button onClick={() => alert('HELLO')}>HELLO</button>
    </div>
  );
}
