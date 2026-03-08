import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe()
                setUser(response.user)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, setUser,setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
