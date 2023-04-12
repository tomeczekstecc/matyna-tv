import React, {useEffect} from 'react'
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from 'next/router'
import Link from "next/link";
import {api} from "@/utils/api";
import {z} from "zod";


const LoginPage = () => {
  const router = useRouter()
  const {data: session} = useSession();

  const [form, setForm] = React.useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const {mutate: change} = api.user.changePassword.useMutation({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await change({
        ...form
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
            Zmień hasło
          </h2>

        </div>
        <div className="mt-8">
          <div className="mt-6">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium ">
                  Stare hasło
                </label>
                <div className="mt-1">
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    autoComplete="password"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="newPassword" className="block text-sm font-medium">
                  Nowe hasło
                </label>
                <div className="mt-1">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Potwierdź nowe hasło
                </label>
                <div className="mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={'w-full'}>
                <Button
                  className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white">
                  Zmień hasło
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
