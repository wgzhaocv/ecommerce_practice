import React, {createContext, useContext, useState} from "react";
import {toast} from "react-hot-toast";
import update from 'immutability-helper';


let init: any
const Context = createContext(init)

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(0);


    const incQty = () => {
        setQty(prevState => prevState + 1)
    }
    const decQty = () => {
        setQty(prevState => {
            if (prevState - 1 < 0) return 0;
            return prevState - 1
        })
    }

    const toggleCartItemQuantity = (id, value) => {
        // @ts-ignore
        const index = cartItems.findIndex((item) => item._id === id)

        if (value === "inc") {
            setCartItems(prevState => {
                const newItem = {
                    ...prevState[index],
                    quantity: prevState[index].quantity + 1
                }
                return update(prevState, {$splice: [[index, 1, newItem]]})
            })
            setTotalQuantities(prevState => prevState + 1)
            setTotalPrice(prevState => prevState + cartItems[index].price)
        } else if (value === "dec") {
            if (cartItems[index].quantity > 1) {
                setCartItems(prevState => {
                    const newItem = {
                        ...prevState[index],
                        quantity: prevState[index].quantity - 1
                    }
                    return update(prevState, {$splice: [[index, 1, newItem]]})
                })
                setTotalQuantities(prevState => prevState - 1)
                setTotalPrice(prevState => prevState - cartItems[index].price)
            }

        }
    }

    const onAdd = (product, quantity) => {
        // @ts-ignore
        const checkProductInCartIdx = cartItems.findIndex((item) => item._id === product._id);
        setTotalPrice(prevState => prevState + product.price * quantity)
        setTotalQuantities(prevState => prevState + quantity)

        if (checkProductInCartIdx !== -1) {
            setCartItems(prevState => {
                // @ts-ignore
                return prevState.map((item, index) => {
                    if (index === checkProductInCartIdx) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                    } else {
                        return item
                    }
                })
            })
        } else {
            setCartItems(pre => [...pre, {...product, quantity}])
        }
        toast.success(`${ qty } ${ product.name } added to the cart.`)
    }
    const resetQty = () => setQty(0)

    const onRemove = (product) => {
        const index = cartItems.findIndex((item) => item._id === product._id)

        setCartItems(prevState => {
            return prevState.filter(item => item._id !== product._id)
        })
        setTotalQuantities(prevState => prevState - cartItems[index].quantity)
        setTotalPrice(prevState => prevState - cartItems[index].quantity * cartItems[index].price)
    }

    return <Context.Provider value={ {
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        resetQty,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalQuantities,
        setTotalPrice
    } }>
        { children }
    </Context.Provider>
}

export const useStateContext = () => useContext(Context)
