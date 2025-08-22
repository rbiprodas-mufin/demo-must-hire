import Image from "next/image"
import { LoginForm } from "./login-form"

const LoginScreen = () => {
  return (
    <div className="grid lg:grid-cols-2 h-[calc(100vh-64px)]">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block rounded-s-lg">
        <Image
          src="/images/login-placeholder.svg"
          alt="Image"
          className="h-full w-full object-cover opacity-80 dark:brightness-[0.2] dark:grayscale"
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}

export default LoginScreen;