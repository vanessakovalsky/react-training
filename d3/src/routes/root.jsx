import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div className="App">
            <header className="App-header">
            <div id="sidebar">
            <h1>MacDouManager</h1>
            <nav>
                <ul>
                <li>
                    <Link to={`/boissons`}>Boissons</Link>
                </li>
                <li>
                    <Link to={`/sandwichs`}>Sandwichs</Link>
                </li>
                <li>
                    <Link to={`/desserts`}>Desserts</Link>
                </li>
                <li>
                    <Link to={`/cart`}>Voir mon panier</Link>
                </li>
                </ul>
            </nav>
            </div>
            </header>
            <div id="detail">
                <Outlet />
            </div>
        </div>
      </>
    );
  }