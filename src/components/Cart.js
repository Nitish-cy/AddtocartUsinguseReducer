import React, { useEffect, useState } from 'react'

const Cart = ({ state, dispatch }) => {
    const { cart } = state;
    const [total, setTotal] = useState(0)
    const decQty=(id,qty)=>{
        dispatch({
            type:"DEC_ITEM",
            payload:{
            id,qty
            }
        })
    }
    const incQty=(id,qty)=>{
        dispatch({
            type:"INC_ITEM",
            payload:{
            id,qty
            }
        })
    }
    useEffect(()=>{
        setTotal(cart.reduce((acc,curr)=>acc+curr.price*curr.qty,0))
    },[cart])
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "20%",
                backgroundColor: "gray"
            }}
        >
            <b style={{ fontSize: 30, alignItems: 'center' }}>Cart</b>
            <b style={{ fontSize: 30, alignItems: 'center' }}>Subtotal: ${total}</b>
            {
                cart.length > 0 ? (
                    cart.map((item) => (
                        <div 
                            style={{
                                display: "flex",
                                flexDirection:"column",
                                padding: 5,
                                border: "1px solid grey",
                                margin: 5,
                                justifyContent: "space-between"
                            }}
                        >
                            <img src={item.thumbnail}
                                alt={item.title}
                                style={{ width: 70, objectFit: "cover" }}>
                            </img>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <span>{item.title}</span>
                                <span>$ {item.price}</span>
                            </div>
                            <div style={{display:"flex" , alignItems:"center",gap:"10"}}>
                                <button onClick={()=>decQty(item.id,item.qty-1)}>-</button>
                                <span>{item.qty}</span>
                                <button onClick={()=>incQty(item.id,item.qty+1)}>+</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <span style={{ padding: 20, alignItems: "center" }}>Cart is empty</span>
                )
            }
        </div>
    )
}

export default Cart