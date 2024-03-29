import { screen } from '@testing-library/react'
import Products from './components/Products';
import { renderWithProviders } from './utils/test-utils';

const testSate= [
      {
        name: "Thon",
        category: "Sandwich",
        unitPrice: 1.5,
        totalPrice: 0,
        quantity: 0,
      },
      {
        name: "Thon",
        category: "Sandwich",
        unitPrice: 1.5,
        totalPrice: 0,
        quantity: 0,
      },
      {
        name: "Thon",
        category: "Sandwich",
        unitPrice: 1.5,
        totalPrice: 0,
        quantity: 0,
      },
      {
        name: "Thon",
        category: "Sandwich",
        unitPrice: 1.5,
        totalPrice: 0,
        quantity: 0,
      },
      {
        name: "Thon",
        category: "Sandwich",
        unitPrice: 1.5,
        totalPrice: 0,
        quantity: 0,
      },
      {
        name: "Thon",
        category: "Sandwich",
        unitPrice: 1.5,
        totalPrice: 0,
        quantity: 0,
      },
      {
        name: "Thon",
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
    ]


test('coca is here', async () => {
  renderWithProviders(<Products category="Boisson"/>, { preloadedState: {
    cart: testSate}})
  expect(screen.getByText(/coca/i)).toBeInTheDocument();  

});