import {UserItem} from "./UserItem"; // entity
import {mockUsers} from "./MockUsers";
import {DeleteUserButton} from "./DeleteUserButton"; // feature

// widget
export function UsersList() {

  return (
    <ul>
      {mockUsers.map((user) => {
        const b = <DeleteUserButton user={user} />

        return (
            <UserItem user={user}
                      deleteButton={b} />
        );
      })}
    </ul>
  )
}

// widget -> entity -> feature