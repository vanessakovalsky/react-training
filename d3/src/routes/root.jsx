import { Outlet, Link } from "react-router-dom";
import { connect } from "react-redux";
import LanguageSwticher from "../components/LanguageSwticher";

function Root() {

    return (
      <>
        <div className="App">
            <header className="App-header">
                <LanguageSwticher />
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
                <li>
                    <Link to={`/add-product`}>Ajouter un produit</Link>
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


  const mapStateToProps = state => ({ locale: state.persistedReducer.i18n.locale });
  export default connect(mapStateToProps)(Root);