import React from "react"
import "../styles/feed.scss"
import Posts from "../components/Posts"
import { usePost } from "../hooks/usePost"
import { useEffect } from "react"
import Navbar from "../../shared/components/Navbar"
import { useAuth } from "../../auth/hooks/useAuth"

const Feed = () => {

    const { feed, handleGetFeed, loading } = usePost()
    const {user} = useAuth()
    // console.log({user})

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
                <Navbar user={user} />
        </main>
    )
}

export default Feed
