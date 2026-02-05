// shared // ui kit
export function Button({text, onClick}: any) {
    return <button style={{color: 'green'}} onClick={onClick}>text</button>
}

// ui -> bll -> dal // транзитивная зависиомость