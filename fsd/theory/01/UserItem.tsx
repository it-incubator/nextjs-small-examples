import {DeleteUserButton} from "./DeleteUserButton";

export function UserItem({user}: { user: {id: number, name: string}}) {

    return <div>
        {user.id} - {user.name} <DeleteUserButton userId={user.id} />
    </div>
}