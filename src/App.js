import React, { useEffect, useState } from 'react';
import Product from './components/Product';
import { connect } from 'react-redux';
import { getPrices, updateCart } from './redux/actions/cart';
import { CSSTransition } from 'react-transition-group';

const App = (props) => {
    let shipping = props.shipping === 'FREE!' ? props.shipping : '$' + parseFloat(props.shipping).toFixed(2);
    const [showNoProduct, setShowNoProduct] = useState(false);
    const [leftColumnClass, setLeftColumnClass] = useState('part-column');
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        props.cart.length > 0 ? setShowNoProduct(false) : setShowNoProduct(true)
    })

    useEffect(() => {
        showNoProduct ? setLeftColumnClass('whole-column') : setLeftColumnClass('part-column')
    }, [showNoProduct])

    return (
        <section className="main-section">
            <CSSTransition
                in={!checkout}
                classNames='transition-longer'
                unmountOnExit
                timeout={0}>
                <>
                    <div className="section-header">
                        <h3>Shopping Cart</h3>
                        <CSSTransition
                            in={!showNoProduct}
                            classNames='transition'
                            unmountOnExit
                            timeout={0}>
                            <button className="main-button" onClick={() => setCheckout(true)}>Proceed to checkout</button>
                        </CSSTransition>
                    </div>
                    <div className={"section-left-column " + leftColumnClass}>
                        {props.cart.length > 0 && props.cart.map((product, index) => (
                            <Product product={product} key={index} />))
                        }
                        <CSSTransition
                            in={showNoProduct}
                            timeout={1000}
                            classNames='transition-longer'
                            unmountOnExit>
                            <p className="no-products">Your cart is empty :(</p>
                        </CSSTransition>
                        <CSSTransition
                            in={!showNoProduct}
                            classNames='transition'
                            timeout={0}
                            unmountOnExit>
                            <div className="section-body-footer">
                                <button className="main-button" onClick={props.getPrices}>Update Shopping Cart</button>
                            </div>
                        </CSSTransition>
                    </div>
                    <CSSTransition
                        in={!showNoProduct}
                        timeout={0}
                        classNames='transition'
                        unmountOnExit>
                        <div className="section-right-column">
                            <p className="checkout-header checkout-content">Shipping <span>{shipping}</span></p>
                            <div className="checkout-body">
                                <p className="checkout-header checkout-content">Cart totals</p>
                                <p className="checkout-content checkout-text">Subtotal <span>${props.subTotal}</span></p>
                                <p className="checkout-content checkout-text">GrandTotal <span>${props.grandTotal}</span></p>
                                <button className="main-button" onClick={() => setCheckout(true)}>Proceed to checkout</button>
                            </div>
                        </div>
                    </CSSTransition>
                </>
            </CSSTransition>
            <CSSTransition
                in={checkout}
                classNames='transition-longer'
                unmountOnExit
                timeout={500}>
                <div className="checkout-container">
                    <div className="checkout">
                        <p>Your order has been submitted successfully!</p>
                    </div>
                </div>
            </CSSTransition>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
        shipping: state.cart.shipping,
        subTotal: state.cart.subTotal,
        grandTotal: state.cart.grandTotal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (product) => dispatch(updateCart(product)),
        getPrices: () => dispatch(getPrices())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)