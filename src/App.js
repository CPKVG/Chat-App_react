import React from 'react'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/Homepage'
// import ChatApp from './Components/ChatApp'

export const App = () => {
  return (
    <div>
      <MainLayout>
        <Homepage/>
        {/* <ChatApp/> */}
      </MainLayout>
    </div>
  )
}

export default App
