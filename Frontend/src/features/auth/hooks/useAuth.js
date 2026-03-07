import { useContext } from "react"
import { AuthContext } from "../auth.context.jsx"
import { login, register, getMe } from "../services/auth.api.js"
import { useNavigate } from "react-router-dom"

export function useAuth() {
    const context = useContext(AuthContext)
    const navigate = useNavigate()

    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (username, password) => {

        setLoading(true)

        try {
            const response = await login(username, password)
            setUser(response.user)
            navigate("/")
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {

        setLoading(true)

        try {
            const response = await register(username, email, password)
            setUser(response.user)
            navigate("/")
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        user, loading, handleLogin, handleRegister
    }


}