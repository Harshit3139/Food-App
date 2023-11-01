import React, { createContext, useContext, useReducer } from 'react'

const CartStateContex = createContext();
const CartDispatchContex = createContext(); 

const reducer = (state,action)=>{

}

export const CartProvider = ({children})=>{

    const [state,dispatch] = useReducer(reducer,[])



    return(
        <CartDispatchContex.Provider value={dispatch}>
            <CartStateContex.Provider value={{state}}>
            {children}
            </CartStateContex.Provider>
        </CartDispatchContex.Provider>

    )

}

export const useCart = ()=>useContext(CartStateContex);
//export const usedDispatchCart = ()=> useContext(CartDispatchContex);
