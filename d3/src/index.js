import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { default as store, persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import Root from "./routes/root";
import Boissons from "./routes/boissons";
import Sandwichs from './routes/sandwichs';
import Desserts from './routes/desserts';
import MyCart from './routes/cart';
import AddProduct from './routes/addproduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "boissons",
        element: <Boissons />,
      },
      {
        path: "sandwichs",
        element: <Sandwichs />,
      },
      {
        path: "desserts",
        element: <Desserts />,
      },
      {
        path: "cart",
        element: <MyCart />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
