import React from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngeredient/BurgerIndgredient';

const burger = (props) => {
    // console.log(props)
    let transfromedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])]
        .map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        })
    })
    .reduce((arr , el) => {
        return arr.concat(el)
    },[])
    if(transfromedIngredients.length === 0) {
        transfromedIngredients = <p>Please start adding ingredients!</p>;
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transfromedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);