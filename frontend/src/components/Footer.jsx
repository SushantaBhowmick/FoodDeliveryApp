import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
       
      </Link>
      
      <p className="text-muted text center">© 2023 GoFood, Inc</p>
    </div>

  </footer>
    </div>
  )
}

export default Footer