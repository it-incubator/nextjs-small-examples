// 05-entities
type UserItemProps = {
    user: {
        id: number;
        name: string;
    };
    actionButtonsSlot: React.ReactElement
    // or renderProps
    // or via children
};

export function UserItem({ user, actionButtonsSlot }: UserItemProps) {
    return (
        <div>
            {user.id} - {user.name} <div> { actionButtonsSlot }</div>
        </div>
    );
}