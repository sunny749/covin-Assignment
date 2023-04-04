import React from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Nav className="me-auto">
        <Link style={{marginRight:'1rem',color:'white',textDecoration:'none'}} to='/'>
            Home
        </Link>
        <Link style={{marginRight:'1rem',color:'white',textDecoration:'none'}} to='/history'>
            History
        </Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Header