import React, {useEffect} from 'react'
import {signIn} from "next-auth/react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {api} from "@/utils/api";
import {useRouter} from "next/router";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";
import {LoadingPage, LoadingSpinner} from "@/components/loading";

const VerifyPassword = () => {

  const [result, setResult] = React.useState<any>(null)

  const router = useRouter()
  const {token, signature} = router.query
  const {mutate: verify, isLoading} = api.user.verifyEmail.useMutation({
    onSuccess: () => {
      toast.success('Zweryfikowano pomyślnie')
      router.push('/')
    },
    onError: (err) => {
      toast.error('Nie udało się zweryfikować')
    }
  })

  useEffect(() => {
      if (token && signature) {
        const ver = async () => {
          const res = await verify({token: token as string, signature: signature as string})
          setResult(res)
        }
        ver()
      }
    }
    , [token, signature])

  if (isLoading) return <LoadingPage size={60}/>
  if (result?.error)
    return (
      <div className="-mt-28 flex h-[80vh] flex-col items-center justify-center py-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-4xl">
            Nie udało sie zweryfikować konta.
            <br/>
            <br/>
            Być może token już wygasł albo został użyty.
          </div>
        </div>
      </div>
    )
}
export default VerifyPassword
