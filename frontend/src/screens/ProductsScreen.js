import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import { saveProduct, listProducts } from '../actions/productActions';


function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [platform, setPlatform] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList);
    // taking these three methods from productList
    const { loading, products, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    // controls the deletion of a game on the frontend from the db
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //   
        };
    }, [successSave]);
  
    // sets the modal to add and edit products, with it being hidden by default
    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setImage(product.image);
        setPlatform(product.platform);
        setGenre(product.genre);
        setDescription(product.description);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id, name, image, platform, genre,
            description
        }));
    }


    return <div className="content content-margined">

        <div className="product-header">
            <h3>Products</h3>
            <button onClick={()=>openModal({})}>Create Product</button>
        </div>
        {modalVisible && 
            <div className="form">
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
                        <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                    </label>
                        <input type="text" name="image" value={image} id="image" onChange={(e) => setImage(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Platform
                    </label>
                        <input type="text" name="platform" value={platform} id="platform" onChange={(e) => setPlatform(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="genre">
                            Genre
                    </label>
                        <input type="text" name="genre" value={genre} id="genre" onChange={(e) => setGenre(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="description">
                            Description
                    </label>
                        <textarea name="description" value={description} id="description" onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </li>
                    <li>
                        <button type="submit" className="button primary">{id ? "Update" : "Create"}</button>
                    </li>
                    <li>
                        <button type="button" onClick={()=>setModalVisible(false)} className="button secondary">Back</button>
                    </li>
                </ul>
            </form>
        </div>
        }
        
        <div className="product-list">

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Platform</th>
                        <th>Genre</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (<tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.platform}</td>
                        <td>{product.genre}</td>
                        <td>
                            <button onClick={() => openModal(product)}>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>))}

                </tbody>
            </table>
        </div>
    </div>

}
export default ProductsScreen;