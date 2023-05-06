'use client'
import React from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from 'next/router'
import {api} from "@/utils/api";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import toast from "react-hot-toast";
import {LoadingSpinner} from "@/components/loading";
import {Header} from "@/components/ui/Header";


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

  const {mutate: change, isLoading} = api.user.changePassword.useMutation({
    onSuccess: async (data) => {
      await signIn('credentials', {
        redirect: false,
        email: session?.user?.email,
        password: form.newPassword
      })
      toast.success('Hasło zostało zmienione')
      await router.push('/')
    },
    onError: async (e) => {
      toast.error('Nie udało się zmienić hasła')
    }
  })

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
    <>
      <Header title={'Profil'} subtitle={'Strona konta użytkownika'} className={undefined}/>
      <div className="flex items-center gap-20 ">
        <Card className={'m-auto w-2/3'}>
          <div className={'flex items-center justify-between'}><CardHeader>
            <CardTitle>Dane zalogowanego użytkownika</CardTitle>
            <CardDescription>Szczegółowe dane zalogowanej osoby</CardDescription>
          </CardHeader>
            {session?.user?.image &&
              <img className={'mr-7 w-16 rounded-full'} src={session?.user?.image} alt={'Zdjęcie profilowe'}/>}
          </div>

          <CardContent>
            <p>Email:</p>
            <p className={'text-xl'}>{session?.user?.email}</p>
          </CardContent>
          {session?.user?.id && <CardContent>
            <p>Id:</p>
            <p className={'text-xl'}>{session?.user?.id}</p>
          </CardContent>}
          <CardContent>
            <p>Imię/Nazwisko/Nazwa:</p>
            <p className={'text-xl'}>{session?.user?.name}</p>
          </CardContent>
          <CardContent>
            <p>Rola:</p>
            <p className={'text-xl'}>{session?.user?.role || 'Użytkownik'}</p>
          </CardContent>
          <CardContent>
            <p>Dostawca uwierzytelnienia:</p>
            <p className={'text-xl'}>{session?.user?.accounts?.[0]?.provider || 'Baza danych'}</p>
          </CardContent>

        </Card>
        <div className="w-1/3 pb-4">
          <div>
            <h2 className="mt-6 text-center text-xl font-bold">
              Zmiana hasła
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
                    {isLoading ? <LoadingSpinner size={22}/> : 'Zmień hasło'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoginPage
