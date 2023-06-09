'use client'
import React from 'react'
import {signIn} from "next-auth/react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {api} from "@/utils/api";
import {useRouter} from "next/router";
import {Icons} from "@/components/icons";
import toast from "react-hot-toast";
import {LoadingSpinner} from "@/components/loading";

const ResetPassword = () => {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  const router = useRouter()
  const {token, signature} = router.query
  const {mutate: resetPassword, isLoading} = api.user.resetPassword.useMutation({
    onSuccess: async (data) => {
      await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      })
      await router.push('/')
      toast.success('Hasło zostało zmienione')
    },
    onError: async (e) => {
      toast.error('Nie udało się zmienić hasła')
    }
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
      await resetPassword({...form, token: token as string, signature: signature as string})

    } catch (e) {
      console.log(e)
    }

  }
  return (
    <div className="-mt-28 flex h-[80vh] flex-col items-center justify-center py-2 sm:px-6 lg:px-8">
      <Icons.logo className="mb-1 h-20 w-20 "/>
      <div className="w-full max-w-md">
        <div>

          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Podaj nowe hasło
          </h2>

        </div>
        <div className="mt-8">
          <div className="mt-6">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium ">
                  Adres email
                </label>
                <div className="mt-1">
                  <Input
                    placeholder={'Email użyty przy rejestracji'}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium ">
                  Nowe hasło
                </label>
                <div className="mt-1">
                  <Input
                    placeholder={'Nowe hasło'}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={'w-full'}>
                <Button
                  disabled={(isLoading || !form?.password || !form?.email)}
                  className="flex w-full justify-center px-4 py-2 text-sm font-medium">
                  {isLoading &&
                    <div className={'mr-2'}><LoadingSpinner size={22}/></div>}
                  Utwórz nowe hasło
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword
