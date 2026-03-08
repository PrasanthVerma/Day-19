import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getFeed , createPost} from "../services/post.api"


export const usePost = () => {
    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async () => {
        try {
            setLoading(true)
            const data = await getFeed()
            setFeed(data.posts)
        } catch (error) {
            console.error("Error fetching feed:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (imageFile, caption) => {
        try {
            setLoading(true)
            const data = await createPost(imageFile, caption)
            setFeed(prevFeed => [data.post, ...(prevFeed || [])])
        } catch (error) {
            console.error("Error creating post:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetFeed()
    }, [])

    return { loading, post, feed, handleGetFeed, handleCreatePost }
}