'use client'
import { Input } from '../ui/input'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom'

export default function SignupForm() {
  const { pending, data } = useFormStatus()
  const [provider, setProvider] = useState('CREDENTIALS')

  return (
    <>
      <div>
        <div className="mb-2 block">
          <label htmlFor="email">Email</label>
        </div>
        <Input
          id="email"
          name="email"
          placeholder="name@flowbite.com"
          required
          type="text"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="password">Your password</label>
        </div>
        <Input
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="password2">Confirm password</label>
        </div>
        <Input
          id="password2"
          name="password2"
          required
          type="password"
        />
      </div>
      <input
        type="hidden"
        id="provider"
        name="provider"
        value={provider}
      />
      <div className="flex items-center gap-2">
        {/* <Checkbox id="remember" /> */}
        {/* <Label htmlFor="remember">Remember me</Label> */}
      </div>
      <button
        type="submit"
        aria-disabled={pending}
        disabled={pending}
      >
        Signup
      </button>
    </>
  )
}
