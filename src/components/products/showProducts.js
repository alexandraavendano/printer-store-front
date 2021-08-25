import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import distinct from "../helpers/listHelper";
import {getProductsByType} from "../helpers/externalCalls";
import {getFirstImage} from "../helpers/imageHelper";
import './showProduct.css';

export default function ShowProducts(props) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProductsByType(setProducts, props.category)
    }, [props.category])

    return (
        <div className="products-container">
            {distinct(products).map(types =>
                <div key={types}>
                    <h3>{types}</h3>
                    <div className="card-group">
                        {products.filter(product => product.type.subType === types).map(product =>
                            <div className="card" key={product.id}>
                                <img src={getFirstImage(product.images)} className="card-img" alt={"name"}/>
                                <div className="card-body product-container">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    {props.category === 'Customizable'
                                        ? <Link to={`products/${product.id}`}>
                                            <button type="button" className="btn btn-primary"> More info</button>
                                          </Link>
                                        : <div/>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}