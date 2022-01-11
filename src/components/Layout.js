import React from "react"

const Layout = ({ children }) => {
  return (
    <div >
      {/* <Header siteTitle={title} /> */}
      <main className="">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout