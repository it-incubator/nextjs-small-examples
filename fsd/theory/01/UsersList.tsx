import {UserItem} from "./UserItem"; // dependency

function UsersList() {
    const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}, {id: 3, name: 'Bob'}]

    return <div>
        {
            users.map(user => <UserItem key={user.id} user={user}/>)
        }
    </div>
}