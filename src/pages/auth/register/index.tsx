'use client'
import React from 'react'
import {Checkbox} from "@/components/ui/checkbox"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
// import ReactJson from 'react-json-view'
import {api} from "@/utils/api";
import Link from "next/link";
import {Icons} from "@/components/icons";


const RegisterPage = () => {

  const {mutate: register} = api.user.register.useMutation({})

  const [form, setForm] = React.useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    confirmPassword: '',
    terms: false
  })

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target
    setForm({
      ...form,
      [name]: (name === 'terms' && checked) ? true : (name === 'terms' && !checked) ? false : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // @ts-ignore
    await register(form)
  }

  return (
    //register page
    <div
      className="-mt-28 flex h-[100vh] flex-col items-center justify-center py-2 sm:px-6 lg:px-8">
      {/*<ReactJson src={form} collapsed={false} enableClipboard={false} displayDataTypes={false} displayObjectSize={false}*/}
      {/*           iconStyle={'square'}/>*/}
      <Icons.logo className="mb-1 h-20 w-20 "/>
      <div className="w-full max-w-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Zarejestruj się
          </h2>
        </div>
        <div className="mt-8">
          <div className="mt-6">
            <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Adres email
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    placeholder={'Wpisz swój adres email'}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-medium">
                  Imię
                </label>
                <div className="mt-1">
                  <Input
                    id="name"
                    placeholder={'Wpisz swoje imię'}
                    name="name"
                    type="text"
                    autoComplete="firstName"
                    required
                    onChange={handleChange}

                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="surname" className="block text-sm font-medium">
                  Nazwisko
                </label>
                <div className="mt-1">
                  <Input
                    id="surname"
                    placeholder={'Wpisz swoje nazwisko'}
                    name="surname"
                    type="text"
                    autoComplete="lastName"
                    required
                    onChange={handleChange}

                  />
                </div>

              </div>
              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Hasło
                </label>
                <div className="mt-1">
                  <Input
                    id="password"
                    placeholder={'Wpisz hasło'}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}

                  />
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium">
                  Potwierdź hasło
                </label>

                <Input
                  id={'confirmPassword'}
                  placeholder={'Potwierdż hasło'}
                  name={'confirmPassword'}
                  type={'password'}
                  required
                  onChange={handleChange}

                />
              </div>
              {/*terms of service*/}
              <div className="flex items-center space-x-2">
                <Checkbox

                  id="terms"
                  required={true}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Zaakceptuj regulamin
                </label>
              </div>
              <div>
                <div className="my-3 text-sm">
                  <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Masz konto? - przejdź do logowania
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white">
                  Zarejestruj się
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
export default RegisterPage
