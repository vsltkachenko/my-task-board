import React from 'react'

function Main({ children }: React.PropsWithChildren) {
   return (
      <main className="container py-10">
         <div className="grid-container">{children}</div>
      </main>
   )
}

export default Main
