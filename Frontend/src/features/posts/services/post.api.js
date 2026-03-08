import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/api/post",
    withCredentials: true
})

export async function getFeed() {
    try {
        const res = await api.get("/feed")
        return res.data
    }
    catch (err) {
        throw err
    }
}

export async function createPost(imageFile,caption){

    const formData = new FormData()

    formData.append("image",imageFile)
    formData.append("caption",caption)

    try{
        const res = await api.post("/create", formData)
        return res.data
    }
    catch(err){
        throw err
    }
}