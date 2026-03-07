import React from "react"
import "../styles/feed.scss"
import Posts from "../components/Posts"
import { usePost } from "../hooks/usePost"
import { useEffect } from "react"


const Feed = () => {

    const { feed, handleGetFeed, loading } = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (<h1>Feed is Loading!!</h1>
        )
    }

    return (
        <main className="feed">
            <section className="feed__posts">
                {
                    feed.map((post, idx) => {
                        return <Posts key={idx} user={post.user} post={post} />
                    })
                }
            </section>
        </main>
    )
}

export default Feed
