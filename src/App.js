import { useEffect, useReducer } from 'react';
import './App.css';
import axios from 'axios';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { cartReducer } from './reducer/cartReducer';
import Products from './components/Products';
import Cart from './components/Cart'
function App() {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });
  console.log(state)
  const fetchProducts = async () => {
    const { data } = await axios.get("https://dummyjson.com/products");
    dispatch({
      type: "ADD_PRODUCTS",
      payload: data.products,
    })
    //console.log(data.products[0].title)
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div style={{ display: "flex" }}>
      <Products state={state} dispatch={dispatch}></Products>
      <Cart state={state} dispatch={dispatch}></Cart>
    </div>
  );
}

export default App;
