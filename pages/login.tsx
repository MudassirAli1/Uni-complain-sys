'use client'

import { useState } from 'react'
import { Eye, EyeOff, GraduationCap, LockKeyhole, UserRound } from 'lucide-react'

const roles = ['Student', 'Resolver', 'Admin'] as const
type Role = (typeof roles)[number]

export default function Page() {
  const [role, setRole] = useState<Role>('Student')
  const [showPassword, setShowPassword] = useState(false)
  const [signedIn, setSignedIn] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSignedIn(true)
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-5 py-7 font-sans text-[#172033] sm:py-10">
      <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-[405px] flex-col items-center" aria-labelledby="welcome-heading">
        <div className="flex size-8 items-center justify-center rounded-[9px] bg-[#126b38] text-white shadow-[0_4px_10px_rgba(18,107,56,0.2)]" aria-hidden="true">
          <GraduationCap size={22} strokeWidth={2.5} />
        </div>

        <header className="mt-3 text-center">
          <h1 id="welcome-heading" className="text-[17px] font-bold tracking-[-0.02em]">Welcome Back</h1>
          <p className="mt-1 text-[10px] leading-4 text-[#687891]">Sign in to manage your complaints or resolve issues.</p>
        </header>

        <div className="mt-5 w-full rounded-[11px] border border-[#dce3ec] bg-white px-5 py-6 shadow-[0_10px_24px_rgba(34,54,82,0.08)] sm:px-[21px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <fieldset>
              <legend className="mb-2 text-[9px] font-bold tracking-[0.08em] text-[#5d6f8a]">I AM A...</legend>
              <div className="grid grid-cols-3 gap-[5px]" aria-label="Choose your role">
                {roles.map((option) => (
                  <button type="button" key={option} aria-pressed={role === option} onClick={() => setRole(option)} className={`h-[23px] rounded-[6px] border text-[8px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#126b38]/30 ${role === option ? 'border-[#126b38] bg-[#f4fbf6] text-[#126b38]' : 'border-[#d9e1eb] bg-white text-[#172033] hover:border-[#126b38]/50'}`}>
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2">
              <label htmlFor="identity" className="text-[9px] font-bold tracking-[0.07em] text-[#5d6f8a]">EMAIL OR STUDENT ID</label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabc0]" size={14} aria-hidden="true" />
                <input id="identity" name="identity" type="text" placeholder="e.g. 22-SAU-042" required className="h-[30px] w-full rounded-[7px] border border-[#d9e1eb] bg-[#f8fafc] pl-8 pr-3 text-[10px] outline-none placeholder:text-[#9aa9bc] focus:border-[#126b38] focus:ring-2 focus:ring-[#126b38]/10" />
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-[9px] font-bold tracking-[0.07em] text-[#5d6f8a]">PASSWORD</label>
             
              </div>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabc0]" size={14} aria-hidden="true" />
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className="h-[30px] w-full rounded-[7px] border border-[#d9e1eb] bg-[#f8fafc] px-8 text-[10px] tracking-[0.15em] outline-none placeholder:text-[#9aa9bc] focus:border-[#126b38] focus:ring-2 focus:ring-[#126b38]/10" />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#9aabc0] hover:text-[#126b38]" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
              <div className="flex items-center justify-between gap-2">

                      <label className="-mt-1 flex items-center gap-1.5 text-[9px] text-[#687891]"><input type="checkbox" name="remember" className="size-3 accent-[#126b38]" />Keep me signed in</label>
                 <button type="button" className="text-[8px] font-bold text-[#126b38] hover:underline ">Forgot?</button>
              </div>
      


            <button className="h-[30px] rounded-[7px] bg-[#126b38] text-[10px] font-bold text-white shadow-[0_5px_10px_rgba(18,107,56,0.18)] hover:bg-[#0d592e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#126b38]/40" type="submit">Sign In</button>
            {signedIn && <p className="-mt-2 text-center text-[9px] font-medium text-[#126b38]" role="status">Ready to sign you in as a {role}.</p>}
          </form>

          <div className="my-5 h-px bg-[#dce3ec]" />
          <p className="text-center text-[9px] text-[#687891]">Don&apos;t have an account?</p>
          <button type="button" className="mt-1 block w-full text-center text-[11px] font-bold text-[#126b38] hover:underline">Create Account</button>
        </div>

        <footer className="mt-auto pt-5 text-center text-[8px] leading-3 text-[#9aabc0]"><p>Authorized access only. Use your official SAU credentials.</p><p>© 2024 Sindh Agriculture University HelpDesk.</p></footer>
      </section>
    </main>
  )
}