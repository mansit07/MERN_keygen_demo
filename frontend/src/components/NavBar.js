import React from 'react'
import { AppBar, Toolbar, styled } from '@mui/material'
import { NavLink } from 'react-router-dom';

const Header = styled(AppBar)`
    background: #111111
`;

const Tabs = styled(NavLink)`
    font-size: 20px;
    margin-right: 20px;
    color: inherit;
    text-decoration: none;
`;

const Navbar = () => {
  return (
    <>
        <Header position='static'>
            <Toolbar>
                <div className='mr-14'>
                    <Tabs to='/'>Demo Application</Tabs>
                </div>
                <div className='mr-3'>
                    <Tabs to='/all'>All User</Tabs>
                </div> 
                <div className='mr-3'>
                    <Tabs to='/productList'>Product List</Tabs>
                </div>
                <div className='mr-3'>
                    <Tabs to='/policyList'>Policy List</Tabs>
                </div>
                <div className='mr-3'>
                    <Tabs to='/license'>License</Tabs>
                </div>
                <div className='mr-3'>
                    <Tabs to='/machine'>Machine</Tabs>
                </div>         
            </Toolbar>
        </Header>
    </>
  )
}

export default Navbar