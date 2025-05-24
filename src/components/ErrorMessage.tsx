import type { ReactNode } from "react"


const ErrorMessage = ({children}: {children: ReactNode}) => {
  return (
    <div className="bg-red-500 text-white py-4 rounded-lg font-bold text-center uppercase text-sm">
      {children}
    </div>
  )
}

export default ErrorMessage
