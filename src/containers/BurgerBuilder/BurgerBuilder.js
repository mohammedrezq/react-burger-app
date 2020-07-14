import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {}
    // }

    state = {
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients()

    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
        .map(igKey=> {
            // console.log(ingredients[igKey]);
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        } ,0)
        // console.log(sum)
         return sum > 0;
    }

    purchaseHandler = () => {
        // console.log(this);
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }


    purchaseCancelHander = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHander = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients Cannot be Loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price.toFixed(2)}
                purchaseCancelled={this.purchaseCancelHander}
                purchaseContinued={this.purchaseContinueHander}/>;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngerdients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));