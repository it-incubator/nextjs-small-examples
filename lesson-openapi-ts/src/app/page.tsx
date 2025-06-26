'use client'
import {useAddPostMutation, useGetTotalUsersQuery, useGetUserPostsQuery} from "@/store/services/instagram-users";

export default function Home() {

    const {data: _, isFetching} = useGetTotalUsersQuery({})
    const {data: posts, isFetching: isFetchingPosts} = useGetUserPostsQuery({
        userId: 1
    }, {})


    const [trigger, {data,}] = useAddPostMutation()


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
                {
                    posts!.items!.map(post => {
                        return <div key={post.id}> {post.images[0] &&
                            <img style={{"width": "50px"}} src={post.images[0].url}/>}</div>
                    })
                }
            </div>
        </div>
    );
}
