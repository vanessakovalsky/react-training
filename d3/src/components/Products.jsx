import React from 'react';
import {useSelector} from "react-redux";

import Product from "./Product";
import { filterProductByCategorie } from '../redux/productSlice';

export default function Products({category}) {
  const selectProducts = useSelector((state) => state.rootReducer.product);
  const products = filterProductByCategorie(selectProducts, category);

  return (
    <div className="Products">
      {products.map((product, index) => (
        <Product key={index} product={product} index={index}/>
      ))}
    </div>
  );
}
