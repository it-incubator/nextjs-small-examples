import React from "react";

type Props = {
    user: any,
    deleteButton: React.Element
}
// entity
export function UserItem(props: any) {
    return  <li>{props.user.name}

        { props.deleteButton }
        {/*<DeleteUserButton user={props.user} />*/}
    </li>
}

// ui -> bll -> dal // транзитивная зависиомость

// dependency injection