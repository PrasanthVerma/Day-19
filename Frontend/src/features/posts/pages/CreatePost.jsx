import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState, useRef } from 'react'
import "../styles/createPost.scss"
import { usePost } from '../hooks/usePost'

const CreatePost = () => {

    const [caption, setCaption] = useState("")
    const postImageInputFileRef = useRef(null)
    const { loading, handleCreatePost } = usePost()
    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        const file = postImageInputFileRef.current.files[0]
        handleCreatePost(file, caption)

        navigate("/")
    }

    if (loading) {
        return (<h1>Post is being created!!</h1>)
    }
    return (
        <main>
            <div className="container">
                <h3>Create Post</h3>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="postImage">Select Image</label>
                        <input hidden ref={postImageInputFileRef} type="file" name="postImage" id="postImage" />
                        <input
                            value={caption}
                            onInput={(e) => {
                                setCaption(e.target.value)
                            }}
                            type="text"
                            name="caption"
                            id="caption"
                            placeholder='Enter Caption' />
                        <button type="submit">create Post
                        </button>
                    </form>
                </div>
                <div className="link-text">
                    <p>Login First if not logged in <Link className="link" to="/login">Login</Link></p>
                </div>
            </div>

        </main>
    )
}

export default CreatePost
