import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from "react-redux";
import { addProduct } from '../redux/productSlice'

export default function ProductForm () {
    const dispatch = useDispatch();
    return (
    <div>
        <Formik
            initialValues={ {name: ''}}
            validate = { values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Obligatoire';
                }
                return errors
            }}
            onSubmit={ values => 
                dispatch(addProduct(values))        
            }
        >
            {({ isSubmitting}) => (
                <div className="form">
                <Form>
                    <label htmlFor="name">Nom du produit</label>
                    <Field name="name" type="text" placeholder="demo texte" />
                    <ErrorMessage name="name" component="div" />
                    <button type="submit" disabled={isSubmitting} className="Cart__purchase">Enregistrer</button>
                </Form>
                </div>
            )}
        </Formik>
    </div>
        
    );
}