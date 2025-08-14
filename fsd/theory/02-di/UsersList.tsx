// 03-widgets

import {UserItem} from "./UserItem";
import {DeleteUserButton} from "../02-di/DeleteUserButton";
import {Button} from "./Button"; // dependency

function UsersList() {
    const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}, {id: 3, name: 'Bob'}]

    return <div>
        {
            users.map(user => {
                const actionsElement = <>
                <Button>like</Button>
                    <DeleteUserButton userId={user.id}/>
                </>

                return <UserItem
                    key={user.id}
                    user={user}
                    actionButtonsSlot={actionsElement}
                />;
            })
        }
    </div>
}