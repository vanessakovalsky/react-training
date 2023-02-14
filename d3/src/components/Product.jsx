import React from 'react';
import {useDispatch} from "react-redux";
import { addToCart } from '../redux/cartSlice';

export default function Product({product, index}) {

  const dispatch = useDispatch();


  return (
    <div className="Product">
      <p>
        {product.name}
      </p>
      <p>
        {product.unitPrice}€
      </p>
      <button onClick={() =>  dispatch(addToCart(product))} className="Product__action">+</button>
    </div>
  );
  
}