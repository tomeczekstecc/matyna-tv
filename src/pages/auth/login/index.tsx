'use client'

import React, {useEffect} from 'react'
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from 'next/router'
import Link from "next/link";
import Image from "next/image";
import {FacebookIcon, Facebook} from "lucide-react"
import {Separator} from "@/components/ui/separator"
import {Icons} from "@/components/icons";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter()
  const {data: session} = useSession();

  const {query} = useRouter()

  useEffect(() => {
    if (query.callbackUrl && session?.user?.email) {
      router.push(query.callbackUrl as string)
    }

    if (session?.user?.email) {
      router.push('/')
    }
  }, [query.callbackUrl, router, session])


  const [form, setForm] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      })
      if (res?.error) {
        toast.error('Nie udało się zalogować')
        return
      }
      toast.success('Zalogowano pomyślnie')
    } catch (e) {
      toast.error('Nie udało się zalogować')
      console.log(e)
    }

  }
  return (
    <div className="-mt-28 flex h-[80vh] flex-col items-center justify-center py-2 sm:px-6 lg:px-8">
      <Icons.logo className="mb-1 h-20 w-20 "/>

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
                  Adres email
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
                {/*<div className="flex items-center">*/}
                {/*  <Checkbox*/}
                {/*    id="remember_me"*/}
                {/*    name="remember_me"*/}
                {/*  />*/}
                {/*  <label htmlFor="remember_me" className="ml-2 block text-sm">*/}
                {/*    Zapamiętaj mie*/}
                {/*  </label>*/}
                {/*</div>*/}
                <div className="text-sm">
                  <Link href="/auth/forget" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Odzyskaj hasło
                  </Link>
                </div>
                <div className="text-sm">
                  <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Nie masz konta? - zarejestruj się
                  </Link>
                </div>
              </div>
              <div className={'w-full'}>
                <Button
                  type="submit"
                  className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white">
                  Zaloguj się
                </Button>
              </div>
            </form>
          </div>
          <div className={'flex items-center gap-3 mt-5'}><Separator className="my-4"/>
            lub
            <Separator className="my-4"/></div>
          <div className={'flex space-x-6'}>
            <div className={'mt-6 w-full'}>
              <Button
                onClick={() => signIn('google')}
                className="flex w-full justify-center px-2 py-2 text-sm font-medium text-white">
                <Image src={'/g1.svg'} alt={'google'} width={50} height={50}/>
                <div>Zaloguj się z Google</div>
              </Button>
            </div>
            <div className={'mt-6 w-full'}>
              <Button
                onClick={() => signIn('facebook')}
                className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white">
                <Facebook color={'#1877F2'}/>
                Zaloguj się z Facebook
                {/* eslint-disable-next-line react/jsx-no-undef */}
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
export default LoginPage
