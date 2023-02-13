import React from "react";
import { Field, reduxForm } from 'redux-form';

let ProductForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nomProduit">Nom du produit</label>
            <Field name="nomProduit" component="input" type="text" placeholder="demo texte" />
            <button type="submit" disabled={pristine || submitting}>Enregistrer</button>
        </form>
    )
}

ProductForm = reduxForm({
    form: 'productadd'
})(ProductForm)


export default ProductForm