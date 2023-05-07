'use client'
import React from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from 'next/router'
import {api} from "@/utils/api";
import toast from "react-hot-toast";
import {LoadingSpinner} from "@/components/loading";
import {Header} from "@/components/ui/Header";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Label} from "@/components/ui/label";
import {Icons} from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";


const LoginPage = () => {
  const router = useRouter()
  const {data: session} = useSession();
  const [open, setOpen] = React.useState(false)

  const [form, setForm] = React.useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }
  const {mutate: deleteAccountAndUser} = api.user.deleteAccountAndUser.useMutation({
    onSuccess: async () => {
      await signOut()
      toast.success('Konto zostało usunięte')
      await router.push('/')
    }
  })
  const {mutate: change, isLoading} = api.user.changePassword.useMutation({
    onSuccess: async () => {
      await signIn('credentials', {
        redirect: false,
        email: session?.user?.email,
        password: form.newPassword
      })
      toast.success('Hasło zostało zmienione')
      await router.push('/')
    },
    onError: async () => {
      toast.error('Nie udało się zmienić hasła')
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await change({...form})
    } catch (e) {
      toast.error('Nie udało się zmienić hasła')
    }
  }

  const dialogDelete = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogClose asChild onClick={() => setOpen(false)}/>
          <DialogTitle>Czy na pewno?</DialogTitle>
          <DialogDescription>
            Zamierzasz usunąć konto użytkownika i wszystkie związane z nim dane (komentarze, blogi). Czy jesteś
            pewna/pewien? operacja jest
            nieodwracalna.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button color={'red'} onClick={() => setOpen(false)} type="submit">REZYGNUJĘ</Button>
          <Button onClick={() => deleteAccountAndUser({userId: session?.user?.id})} variant={'destructive'}
                  type="submit">{isLoading &&
            <div className={'mr-2'}><LoadingSpinner size={18}/></div>} usuwam</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const handleDeleteAccountAndUser = () => {
    setOpen(true)
  }

  // @ts-ignore
  return (
    <>
      {dialogDelete}
      <div className={'mb-6 flex items-center gap-6'}>
        <Header title={'Profil'} subtitle={'Strona konta użytkownika'} className={undefined}/>
        {session?.user?.image &&
          <img className={'mr-7 w-16 rounded-full'} src={session?.user?.image} alt={'Zdjęcie profilowe'}/>}</div>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Dane podstawowe</TabsTrigger>
          <TabsTrigger value="pass">Zmień hasło</TabsTrigger>
          <TabsTrigger value="danger">Strefa niebezpieczna</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <section>
            <div className={'text-2xl font-extrabold'}>Dane zalogowanego użytkownika</div>
            <div>Szczegółowe dane zalogowanej osoby</div>

            <div className={'mt-8 grid grid-cols-2 gap-10'}>
              {/*email*/}
              <div>
                <Label className={'text-lg'} htmlFor={'email'}>Adres email</Label>
                <Input
                  className={'px-4 py-6 text-lg '}
                  id="email"
                  value={session?.user?.email}
                  readOnly
                />
              </div>
              {/*id*/}
              <div>
                <Label className={'text-lg'} htmlFor={'id'}> Id</Label>
                <Input
                  className={'px-4 py-6 text-lg '}

                  id="id"
                  value={session?.user?.id}
                  readOnly
                />
              </div>
              {/*name*/}
              <div>
                <Label className={'text-lg'} htmlFor={'name'}> Imię</Label>
                <Input
                  className={'px-4 py-6 text-lg '}

                  id="name"
                  value={session?.user?.name}
                  readOnly
                />
              </div>
              {/*role*/}
              <div>
                <Label className={'text-lg'} htmlFor={'role'}> Rola</Label>
                <Input
                  className={'px-4 py-6 text-lg '}

                  id="role"
                  value={session?.user?.role === 'USER' ? 'Użytkownik' : 'Administrator'}
                  readOnly
                />
              </div>

              {/*provider*/}
              <div>
                <Label className={'text-lg'} htmlFor={'provider'}> Dostawca uwierzytelnienia</Label>
                <Input
                  className={'px-4 py-6 text-lg '}

                  id="provider"
                  value={session?.user?.accounts?.[0]?.provider || 'Baza danych'}
                  readOnly
                />
              </div>
              {/*provider*/}
              <div>
                <Label className={'text-lg'} htmlFor={'provider'}> Data utworzenia</Label>
                <Input
                  className={'px-4 py-6 text-lg '}
                  id="provider"
                  // ts-ignore
                  value={Intl.DateTimeFormat('pl-pl').format(new Date(session?.user?.createdAt || '1970-01-01' as string))}
                  readOnly
                />
              </div>
            </div>
          </section>
        </TabsContent>
        <TabsContent value="pass">

          <div className={'text-2xl font-extrabold'}>Zmiana hasła</div>
          <div>Zmień hasło do swojego konta</div>
          <div className={'m-auto w-7/12 p-6'}>
            <Icons.logo className="m-auto mb-1 h-20 w-20 "/>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold">
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
        </TabsContent>
        <TabsContent value="danger">
          <section>

            <div className={'text-2xl font-extrabold'}>Usuwanie konta</div>
            <div>Usuwanie konta jest nieodwracalne. Po usunięciu konta nie będzie możliwości jego odzyskania.</div>

            Usuń konto z bazy danych
            <div className={'mt-8'}>
              <Button
                className={'!hover:bg-red-600 !active:bg-red-700 !focus:bg-red-700 !bg-red-500'}
                onClick={handleDeleteAccountAndUser}
              >
                Usuń konto
              </Button>
            </div>


          </section>
        </TabsContent>
      </Tabs>
    </>
  )
}
export default LoginPage
