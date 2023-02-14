import React from 'react';
import {useDispatch} from "react-redux";
import { Translate } from "react-redux-i18n";
import { addToCart } from '../redux/cartSlice';

export default function Product({product, index}) {

  const dispatch = useDispatch();


  return (
    <div className="Product">
      <p>
        <Translate value="product.name" />
        {" "}
        {product.name}
      </p>
      <p>
        {product.unitPrice}€
      </p>
      <button onClick={() =>  dispatch(addToCart(product))} className="Product__action">+</button>
    </div>
  );
  
}