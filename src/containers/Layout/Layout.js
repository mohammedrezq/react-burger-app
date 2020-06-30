import React, { Component } from 'react';
import Aux from '../auxiliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true,
    }
    sideDrawerClosedHander = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHander = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }  
        });
    }

    render(){
        return(
            <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHander} />
        <SideDrawer 
            open={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHander}/>
        <main className={classes.Content}>
            {this.props.children}
        </main> 
    </Aux>
        )
    }
}

export default Layout;