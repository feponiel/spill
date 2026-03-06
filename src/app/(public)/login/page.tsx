import { Metadata } from 'next'
import { LoginContent } from './LoginContent'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return <LoginContent />
}
