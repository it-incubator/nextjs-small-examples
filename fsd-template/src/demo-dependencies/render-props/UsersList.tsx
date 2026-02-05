import {UserItem} from "./UserItem"; // entity
import {mockUsersIds} from "./MockUsers";
import {DeleteUserButton} from "./DeleteUserButton"; // feature

// widget
export function UsersList() {

  return (
    <ul>
      {mockUsersIds.map((userId) => {
        const renderFunction = (user) => <DeleteUserButton user={user} />
        // children // compound pattern

        return (
            <UserItem userId={userId}
                      deleteButton={renderFunction} />
        );
      })}
    </ul>
  )
}

// widget -> entity -> feature