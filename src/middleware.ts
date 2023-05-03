export {default} from 'next-auth/middleware'

export const config = {
  matcher: ["/media", "/blog/new", "/blog/edit", "/auth/profile"]
}
