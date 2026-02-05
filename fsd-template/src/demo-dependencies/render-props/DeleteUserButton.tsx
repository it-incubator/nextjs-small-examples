import {User} from "./User";
import {Button} from "./Button";

// feature
export function DeleteUserButton(props: { user: User }) {
    const handleClick = () => {
        // mutate();
    }
    return <Button onClick={handleClick}>delete</Button>
}

// ui -> bll -> dal // транзитивная зависиомость