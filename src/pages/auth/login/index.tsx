import React from 'react'
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from 'next/router'


const LoginPage = () => {
  const router = useRouter()
  const {data: session} = useSession();

  const {query} = useRouter()

  if (query.callbackUrl && session?.user?.email) {
    router.push(query.callbackUrl as string)
  }

  const [form, setForm] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      })
    } catch (e) {
      console.log(e)
    }

  }
  return (
    <div className="-mt-28 flex h-[80vh] flex-col items-center justify-center py-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div>

          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Zaloguj się do swojego konta
          </h2>

        </div>
        <div className="mt-8">
          <div className="mt-6">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  Email address
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember_me"
                    name="remember_me"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className={'w-full'}>
                <Button
                  className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white">
                  Zaloguj się
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
export default LoginPage
