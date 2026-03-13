import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrationForm } from './RegistrationForm'
import { VerifyEmailForm } from './VerifyEmailForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/verify-email" element={<VerifyEmailForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
