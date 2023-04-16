import UseAuth from '@/hooks/UseAuth'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import router from 'next/router'
import { useAppDispatch, useAppSelector } from './hooks/useStore'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { signin } from './store/UserSlice'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  // if (request.cookies.get('userId')?.value) {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const userid = user.uid;
  //       if ( userid === request.cookies.get('userId')?.value){
  //         return NextResponse.redirect(new URL('/:path*', request.url))
  //       }
  //     } else {
  //       request.cookies.delete('userId')
    // return NextResponse.redirect(new URL('/', request.url))
  //     }
  //   });
  // }
  // else {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const userid = user.uid;
  //       if ( userid === request.cookies.get('userId')?.value){
  //         const response = NextResponse.next()
  //         response.cookies.set("userId", userid)
  //         return response
  //       }
  //     } else {
  //       return NextResponse.redirect(new URL('/', request.url))
  //     }
  //   });

  // }
}