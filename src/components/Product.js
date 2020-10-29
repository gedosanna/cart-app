import React, { useEffect, useState } from 'react';
import xImg from '../images/x-img.png';
import headphones from '../images/headphones.png';
import editImg from '../images/edit-img.png';
import { connect } from 'react-redux';
import { updateCart, getPrices, removeFromCart } from '../redux/actions/cart';

const Product = (props) => {
    const [productAmount, setProductAmount] = useState(props.product.amount);

    useEffect(() => {
        props.updateCart([props.product.id, productAmount])
    }, [productAmount])

    return (
        <div className="product-container">
            <div className="picture-container">
                <h5 className="product-information-title"></h5>
                <div className="picture-box-container">
                    <img src={xImg} onClick={() => props.removeFromCart(props.product.id)} />
                    <img src={headphones} />
                </div>
            </div>
            <div className="product-information">
                <h5 className="product-information-title">Product Name</h5>
                <div className="product-information-content">
                    <p className="product-information-content-text">Headphones</p>
                </div>
            </div>
            <div className="product-information">
                <h5 className="product-information-title">Unit Price</h5>
                <div className="product-information-content">
                    <p className="product-information-content-text">${props.product.price}</p>
                </div>
            </div>
            <div className="product-information">
                <h5 className="product-information-title">Qty</h5>
                <div className="product-information-content">
                    <button className="qty-button" onClick={() => { if (productAmount > 1) setProductAmount(productAmount - 1) }}>-</button>
                    <input className="qty-input" type="number" value={productAmount} onChange={(e) =>{if(parseInt(e.target.value) === 0) e.target.value = 1;setProductAmount(parseInt(e.target.value))}} />
                    <button className="qty-button" onClick={() => setProductAmount(productAmount + 1)}>+</button>
                    <img className="qty-edit" src={editImg} onClick={props.getPrices} />
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (product) => dispatch(updateCart(product)),
        getPrices: () => dispatch(getPrices()),
        removeFromCart: (id) => dispatch(removeFromCart(id))
    }
}

export default connect(null, mapDispatchToProps)(Product)