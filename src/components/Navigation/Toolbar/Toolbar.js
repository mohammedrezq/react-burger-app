import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavgationItems from '../NaigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavgationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
    );

export default toolbar;