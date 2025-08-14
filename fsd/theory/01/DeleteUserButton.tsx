export function DeleteUserButton({userId}: { userId: number}) {
    const handleDelete = () => {
        console.log(`delete userId: ${userId}`)
    }
    return <div>
        <button onClick={handleDelete}>delete</button>
    </div>
}



// DeleteUserButton   ---->     button
//                     ———>     button