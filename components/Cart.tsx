import React, {useRef} from 'react';
import {useStateContext} from "../context/stateContext";
import {AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping} from "react-icons/ai";
import {urlFor} from "../lib/client";
import {TiDelete} from "react-icons/ti";
import getStripe from "../lib/getStripe";
import {toast} from "react-hot-toast";


function Cart(props: any) {
    const {
        showCart,
        cartItems,
        qty,
        incQty,
        decQty,
        toggleCartItemQuantity,
        totalPrice,
        totalQuantities,
        setShowCart,
        onRemove
    } = useStateContext();
    const cartRef = useRef();

    const handleCheckOut = async () => {
        const stripe = await getStripe()
        const response = await fetch('/api/stripe', {
            method: 'post', headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(cartItems)
        })
        if (response.status===500){
            return;
        }
        const data=await response.json();
        if (data){
            toast.loading('Redirecting');
        }
        stripe.redirectToCheckout({sessionId:data.id})
    }

    return (
        <div className={ "cart-wrapper" } ref={ cartRef }>
            <div className={ "cart-container" }>
                <button type={ "button" } className={ "cart-heading" } onClick={ () => setShowCart(false) }>
                    <AiOutlineLeft/>
                    <span className={ "heading" }>Your Cart</span>
                    <span className={ "cart-num-items" }>({ totalQuantities } items)</span>
                </button>

                { cartItems.length < 1 && (<div className={ "empty-cart" }>
                    <AiOutlineShopping size={ 150 }/>
                    <h3>Your shopping bag is empty.</h3>
                    <button type={ "button" } className={ "btn" } onClick={ () => setShowCart(false) }>Continue
                        shopping
                    </button>
                </div>) }
                <div className={ "product-container" }>
                    { cartItems.length >= 1 && cartItems.map((item, idex) => (
                        <div key={ item._id } className={ "product" }>
                            <img src={ urlFor(item?.image[0]) } className={ "cart-product-image" }/>
                            <div className={ "item-desc" }>
                                <div className={ "flex top" }>
                                    <h5>{ item.name }</h5>
                                    <h4>${ item.price }</h4>
                                </div>
                                <div className={ "flex bottom" }>
                                    <div>
                                        <p className={ "quantity-desc" }>
                                            <span className={ "minus" }
                                                  onClick={ () => toggleCartItemQuantity(item._id, "dec") }><AiOutlineMinus/></span>
                                            <span className={ "num" }>{ item.quantity }</span>
                                            <span className={ "plus" }
                                                  onClick={ () => toggleCartItemQuantity(item._id, "inc") }><AiOutlinePlus/></span>
                                        </p>
                                    </div>
                                    <button type={ "button" } className={ "remove-item" }
                                            onClick={ () => onRemove(item) }>
                                        <TiDelete/>
                                    </button>
                                </div>

                            </div>
                        </div>))
                    }
                </div>

                { cartItems.length >= 1 && (<div className={ "cart-bottom" }>
                    <div className={ "total" }>
                        <h3>Subtotal: </h3>
                        <h3>${ totalPrice }</h3>
                    </div>
                    <div className={ "btn-container" }>
                        <button type={ "button" } className={ "btn" } onClick={handleCheckOut}> Pay with stripe</button>
                    </div>
                </div>) }
            </div>
        </div>
    );
}

export default Cart;
