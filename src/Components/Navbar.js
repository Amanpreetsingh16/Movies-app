
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  

  render() {
    const navbarstl={
    display:"flex",
    alignItem:"center",
    

    }
    return (
      <div style={navbarstl}>
        <Link to='/' style={{textDecoration:'none'}}>
        <h1>Movies</h1>
        </Link>
        <Link to='/favourites' style={{textDecoration:'none'}}>
        <h3 style={{marginLeft:"1rem",marginTop:"1.5rem"}}>Favourites</h3>
        </Link>
      </div>
    )
  }
 
}
