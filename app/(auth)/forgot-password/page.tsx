import Link from 'next/link'
import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div className="mb-10 md:mb-0">
      <p className="text-xl font-medium md:text-3xl mb-8 text-custom-black">
        Log in to your account
      </p>
      {/* <ForgotPassw /> */}
      <div className="mt-3.5">
        <p className="text-center text-[13px]">
          Forgot your password?{"  "}
          <Link
            href="/forgot-password"
            className="cursor-pointer font-semibold underline hover:text-custom-blue">
            Reset it here?
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage