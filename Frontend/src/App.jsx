import React from 'react'
import AppRouter from './AppRoutes'
import "./style.scss"
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/posts/post.context'

const App = () => {
  return (
    <>
      <AuthProvider>
        <PostContextProvider> 
        <AppRouter />
        </PostContextProvider>
      </AuthProvider>
    </>
  )
}

export default App
