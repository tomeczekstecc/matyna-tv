import React from 'react'
import {signIn} from "next-auth/react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const ForgetPassword = () => {
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
            Zresetuj hasło
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
              <div className={'w-full'}>
                <Button
                  className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white">
                  Resetuj hasło
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
