'use client'

import {useState} from "react";

export default function Demo() {
    const [counter, setCounter]= useState(1)
    return (
        <div onClick={() => setCounter(counter + 1)}>
            Hello Demo {counter}

            {/*{ не можем в клиентском компоеннте рисовать серверный  }*/}
            {/*<ServerComponent />*/}
        </div>
    );
}
// compoentn -> react alemetn -> fiber tree -> html string