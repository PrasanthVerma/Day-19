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