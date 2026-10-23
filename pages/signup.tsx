'use client'

import { useState } from 'react'
import { Eye, EyeOff, GraduationCap, LockKeyhole, UserRound, Mail, BriefcaseBusiness } from 'lucide-react'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-5 py-8 font-sans text-[#172033] sm:py-12">
      <section className="mx-auto flex w-full max-w-[405px] flex-col items-center">
        <div className="flex size-9 items-center justify-center rounded-[9px] bg-[#126b38] text-white shadow-[0_4px_10px_rgba(18,107,56,0.2)]">
          <GraduationCap size={24} strokeWidth={2.4} />
        </div>

        <header className="mt-4 text-center">
          <h1 className="text-[20px] font-bold tracking-[-0.03em]">Create Account</h1>
          <p className="mt-1 text-[10px] leading-4 text-[#687891]">
            Join the SAU HelpDesk to start resolving university issues.
          </p>
        </header>

        <div className="mt-6 w-full rounded-[11px] border border-[#dce3ec] bg-white px-5 py-6 shadow-[0_10px_24px_rgba(34,54,82,0.08)]">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-[9px] font-bold tracking-[0.07em] text-[#5d6f8a]">FULL NAME</label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabc0]" size={14} />
                <input id="fullName" type="text" placeholder="e.g. Ahmed Khan" required className="h-[32px] w-full rounded-[7px] border border-[#d9e1eb] bg-[#f8fafc] pl-8 pr-3 text-[10px] outline-none placeholder:text-[#9aa9bc] focus:border-[#126b38] focus:ring-2 focus:ring-[#126b38]/10" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="studentId" className="text-[9px] font-bold tracking-[0.07em] text-[#5d6f8a]">STUDENT ID / EMPLOYEE ID</label>
              <div className="relative">
                <BriefcaseBusiness className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabc0]" size={14} />
                <input id="studentId" type="text" placeholder="e.g. 22-SAU-042" required className="h-[32px] w-full rounded-[7px] border border-[#d9e1eb] bg-[#f8fafc] pl-8 pr-3 text-[10px] outline-none placeholder:text-[#9aa9bc] focus:border-[#126b38] focus:ring-2 focus:ring-[#126b38]/10" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[9px] font-bold tracking-[0.07em] text-[#5d6f8a]">UNIVERSITY EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabc0]" size={14} />
                <input id="email" type="email" placeholder="ahmed@sau.edu.pk" required className="h-[32px] w-full rounded-[7px] border border-[#d9e1eb] bg-[#f8fafc] pl-8 pr-3 text-[10px] outline-none placeholder:text-[#9aa9bc] focus:border-[#126b38] focus:ring-2 focus:ring-[#126b38]/10" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="department" className="text-[9px] font-bold tracking-[0.07em] text-[#5d6f8a]">DEPARTMENT</label>
              <select id="department" required defaultValue="" className="h-[32px] w-full rounded-[7px] border border-[#d9e1eb] bg-[#f8fafc] px-3 text-[10px] text-[#687891] outline-none focus:border-[#126b38] focus:ring-2 focus:ring-[#126b38]/10">
                <option value="" disabled>Select Department</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
                <option>Agriculture</option>
                <option>Finance</option>
                <option>Administration</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-[9px] font-bold tracking-[0.07em] text-[#5d6f8a]">PASSWORD</label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabc0]" size={14} />
                <input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className="h-[32px] w-full rounded-[7px] border border-[#d9e1eb] bg-[#f8fafc] px-8 text-[10px] tracking-[0.15em] outline-none placeholder:text-[#9aa9bc] focus:border-[#126b38] focus:ring-2 focus:ring-[#126b38]/10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#9aabc0] hover:text-[#126b38]">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="text-[9px] font-bold tracking-[0.07em] text-[#5d6f8a]">CONFIRM PASSWORD</label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aabc0]" size={14} />
                <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" required className="h-[32px] w-full rounded-[7px] border border-[#d9e1eb] bg-[#f8fafc] px-8 text-[10px] tracking-[0.15em] outline-none placeholder:text-[#9aa9bc] focus:border-[#126b38] focus:ring-2 focus:ring-[#126b38]/10" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label={showConfirmPassword ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#9aabc0] hover:text-[#126b38]">
                  {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <p className="text-[9px] leading-4 text-[#687891]">
              By creating an account, you agree to our{' '}
              <a href="#terms" className="font-bold text-[#126b38] hover:underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#privacy" className="font-bold text-[#126b38] hover:underline">Privacy Policy</a>{' '}
              regarding university data handling.
            </p>

            <button type="submit" className="h-[32px] rounded-[7px] bg-[#126b38] text-[10px] font-bold text-white shadow-[0_5px_10px_rgba(18,107,56,0.18)] transition-colors hover:bg-[#0d592e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#126b38]/40">
              Create Account
            </button>
          </form>

          <div className="my-5 h-px bg-[#dce3ec]" />
          <p className="text-center text-[9px] text-[#687891]">Already have an account?</p>
          <a href="#signin" className="mt-1 block text-center text-[11px] font-bold text-[#126b38] hover:underline">Sign In</a>
        </div>

        <p className="mt-5 text-center text-[8px] text-[#9aabc0]">Trouble signing up? Contact the IT Administrator.</p>
        <footer className="mt-2 text-center text-[8px] text-[#9aabc0]">© 2024 SAU Student HelpDesk.</footer>
      </section>
    </main>
  )
}