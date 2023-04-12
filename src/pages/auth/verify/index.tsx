import React, {useEffect} from 'react'
import {signIn} from "next-auth/react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {api} from "@/utils/api";
import {useRouter} from "next/router";
import jwt from "jsonwebtoken";

const VerifyPassword = () => {

  const [result, setResult] = React.useState<any>(null)

  const router = useRouter()
  const {token, signature} = router.query
  const {mutate: verify} = api.user.verifyEmail.useMutation({})

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

  return (
    <div className="-mt-28 flex h-[80vh] flex-col items-center justify-center py-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div>

          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {JSON.stringify(result)}
            <br/>
            {JSON.stringify(token)}

            {JSON.stringify(signature)}

          </h2>

        </div>
        <div className="mt-8">
          <div className="mt-6">

          </div>
        </div>
      </div>
    </div>
  )
}
export default VerifyPassword
