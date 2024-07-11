import { SignIn, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'

const RightSideBar = () => {
  return (
    <section className='right_sidebar text-white-1'>
      <SignedOut>
      <SignInButton/>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>

    </section>
  )
}

export default RightSideBar