'use client'
import {useAddPostMutation, useGetTotalUsersQuery, useGetUserPostsQuery} from "@/store/services/instagram-users";

export default function Home() {

    const {data: usersCount, isFetching} = useGetTotalUsersQuery({})
    const {data: posts, isFetching: isFetchingPosts, error, isError} = useGetUserPostsQuery({
        userId: 1
    }, {})

    const [trigger] = useAddPostMutation()


    if (isFetching || isFetchingPosts) {
        return <div>loading...</div>
    }

    return (
        <div>

            <button onClick={() => {
                trigger({
                    description: 'dddddd',
                    childrenMetadata: [{
                        uploadId: '32323'
                    }]
                });
            }}>
                CREATE
            </button>
            <div>
                { isError && JSON.stringify(error)}

                {
                    posts?.items!.map(post => {
                        return <div key={post.id}>
                            {post.userName}, {post.description}
                            {post.images[0] &&
                            <img style={{"width": "50px"}} src={post.images[0].url}/>}</div>
                    })
                }
            </div>
        </div>
    );
}
