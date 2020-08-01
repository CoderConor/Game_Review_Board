import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { saveProduct } from '../actions/productActions';


function ProductsScreen(props) {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const dispatch = useDispatch();

    useEffect(() => {

        return () => {
            //   
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ 
            name, image, platform, genre, 
            description}));
    }


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Product</h2>
                </li>
                <li>
                    {loadingSave && <div>Loading...</div>}
                    {errorSave && <div>{errorSave}</div>}

                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="image">
                        Image
                    </label>
                    <input type="text" name="image" id="image" onChange={(e) => setImage(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="name">
                        Platform
                    </label>
                    <input type="text" name="platform" id="platform" onChange={(e) => setPlatform(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="genre">
                        Genre
                    </label>
                    <input type="text" name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="description">
                        Description
                    </label>
                    <textarea name="description" id="description" onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                </li>
                <li>
                    <button type="submit" className="button primary">Create</button>
                </li>
            </ul>
        </form>
    </div>
}
export default ProductsScreen;