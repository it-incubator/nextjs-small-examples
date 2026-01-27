'use client'
import Image from "next/image";
import styles from "./page.module.css";

import assetsImage from "../shared/assets/next-from-assets.svg";
import {useState} from "react";
import { PublicIcon, SharedIcon } from "@/shared/ui/icon";
//import  "../shared/assets/icons-sprite.svg";

export default function Home() {
    const [counter, setCounter] = useState(0);
    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />
                <div>
                    <Image
                        className={styles.logo}
                        src={assetsImage}
                        alt="Vercel logomark"
                        width={100}
                        height={20}
                    />

<button onClick={() => setCounter(counter + 1)}>{counter}</button>
                    {counter > 2 && <div>
                        <PublicIcon size={30} name={'white-house'}/>
                        <SharedIcon size={30} name={"white-bookmark"}/>
                    </div>
                    }



                </div>
            </div>


        </div>
    );
}
