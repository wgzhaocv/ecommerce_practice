import React from 'react';
import Link from "next/link";
import {AiOutlineShopping} from "react-icons/ai";
import {Cart} from "./index";
import {useStateContext} from "../context/stateContext";


function Navbar(props: any) {
    const {showCart,cartItems,totalQuantities,setShowCart}=useStateContext();

    return (
        <div className={"navbar-container"}>
            <p className={"logo"}>
                <Link href={"/"}>
                    JSM headphones
                </Link>
            </p>
            <button type={"button"} className={"cart-icon"} onClick={()=>setShowCart(true)}>
                <AiOutlineShopping/>
                <span className={"cart-item-qty"}>{totalQuantities}</span>
            </button>
            {showCart&& <Cart/> }
        </div>
    );
}

export default Navbar;
