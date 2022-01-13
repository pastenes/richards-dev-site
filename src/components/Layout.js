import React from "react"

const Layout = ({ children }) => {
  return (
    <div >
      {/* <Header siteTitle={title} /> */}
      <main>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout