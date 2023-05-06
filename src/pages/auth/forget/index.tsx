'use client'
import React from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {api} from "@/utils/api";
import Link from "next/link";
import {Icons} from "@/components/icons";
import toast from "react-hot-toast";
import router from "next/router";
import {LoadingSpinner} from "@/components/loading";

const ForgetPassword = () => {
  const [form, setForm] = React.useState({
    email: '',
    password: ''
  })

  const {mutate: requestResetPassword, isLoading} = api.user.requestResetPassword.useMutation({
    onSuccess: async (data) => {
      toast.success('Link do zmiany hasła został wysłany na podany adres email')
      router.push('/auth/login')
    },
    onError: async (e) => {
      toast.error('Nie udało się wysłać linku do zmiany hasła')

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
      await requestResetPassword(form)

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
            Zresetuj hasło
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
              <div className={'flex justify-between'}>
                <div className="text-sm">
                  <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Wróć do logowania
                  </Link>
                </div>
                <div className="text-sm">
                  <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Zarejestruj się
                  </Link>
                </div>
              </div>
              <div className={'w-full'}>
                <Button
                  disabled={!form.email || isLoading}
                  className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white">
                  {isLoading && <div className={'mr-2'}><LoadingSpinner size={22}/></div>}Resetuj hasło
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForgetPassword
