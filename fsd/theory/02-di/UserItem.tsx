// 05-entities
type UserItemProps = {
    user: {
        id: number;
        name: string;
    };
    actionButtonsSlot: React.ReactElement
};

export function UserItem({ user, actionButtonsSlot }: UserItemProps) {
    return (
        <div>
            {user.id} - {user.name} <div> { actionButtonsSlot }</div>
        </div>
    );
}