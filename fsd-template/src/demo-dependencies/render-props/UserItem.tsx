import React from "react";
import {useQuery} from "@tanstack/react-query";

type Props = {
    userId: any,
    deleteButton: () => React.Element
}
// entity
export function UserItem(props: any) {
    const user = useQuery(props.userId)

    return  <li>{props.user.name}

        { props.deleteButton(user) }
        {/*<DeleteUserButton user={props.user} />*/}
    </li>
}

// ui -> bll -> dal // транзитивная зависиомость

// dependency injection