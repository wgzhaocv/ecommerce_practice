import React, {useEffect, useState} from 'react';
import {useStateContext} from "../context/stateContext";
import {BsBagCheckFill} from "react-icons/bs";
import Link from "next/link";
import {runFirework,stopFirework} from "../lib/utils";

function Success(props: any) {
    const {
        setCartItems,
        setTotalQuantities,
        setTotalPrice
    } = useStateContext();

    const [order, setOrder] = useState(null);

    useEffect(()=>{
        localStorage.clear();
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0);
        runFirework();
        return ()=>{
            stopFirework()
        }
    },[])
    return (
        <div className={ "success-wrapper" }>
            <div className={ "success" }>
                <p className={ "icon" }>
                    <BsBagCheckFill/>
                </p>
                <h2>thank you for your order!</h2>
                <p className={ "email-msg" }>check your email box for the receipt</p>
                <p className={ "description" }>
                    if you have any questions, please email<a className={ "email" }
                                                              href={ 'mailto:wgzhaocv@gmail.com' }>wgzhaocv@gmail.com</a>
                </p>
                <Link href={ "/" }>
                    <button type={ "button" } style={ {width: 300} } className={ "btn" }>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Success;
