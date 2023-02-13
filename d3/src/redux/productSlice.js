import { createSlice } from '@reduxjs/toolkit'


export const productSlice = createSlice({
  name: 'product',
  initialState: [
        {
          name: "Thon",
          category: "Sandwich",
          unitPrice: 1.5,
          totalPrice: 0,
          quantity: 0,
        },
        {
          name: "Jambon",
          category: "Sandwich",
          unitPrice: 1.5,
          totalPrice: 0,
          quantity: 0,
        },
        {
          name: "Oeuf",
          category: "Sandwich",
          unitPrice: 1.5,
          totalPrice: 0,
          quantity: 0,
        },

        {
          name: "Blé",
          category: "Sandwich",
          unitPrice: 2,
          totalPrice: 0,
          quantity: 0,
        },
        {
          name: "Thé bio",
          category: "Boisson",
          unitPrice: 1,
          totalPrice: 0,
          quantity: 0,
        },
        {
          name: "Coca",
          category: "Boisson",
          unitPrice: 3,
          totalPrice: 0,
          quantity: 0,
        },
        {
          name: "Muffin",
          category: "Dessert",
          unitPrice: 15,
          totalPrice: 0,
          quantity: 0,
        },
        {
          name: "Fleurs d'oranger",
          category: "Dessert",
          unitPrice: 50,
          totalPrice: 0,
          quantity: 0,
        },
      ],
  reducers: {}
})

export const selectProducts = (state) => {
  const products =  state.product;
  console.log(products);
  return  { products}
}

export function filterProductByCategorie(items, category) {
  console.log(items);
  const filteredItems = items.filter((item) =>
    item.category === category);
  return filteredItems;
}

export default productSlice.reducer