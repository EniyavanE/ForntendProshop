import { Link, useParams, useNavigate } from "react-router-dom"
import { useState } from "react";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Rating } from "../Components/Rating.jsx";
import { useGetProductDetailQuery } from "../slices/productApiSlice.js";
import { Loader } from "../Components/Loader.jsx";
import { addToCart } from "../slices/cartSlics.js";
import { useDispatch } from "react-redux";


export const ProductScreen = () => {
    const { id: productId } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const { data: product, isLoading, error } = useGetProductDetailQuery(productId)
    //console.log([...Array(product.countInStock).keys()])
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate("/cart")
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {isLoading ? (<Loader />) : error ? (<h2>error?.data?.message</h2>) : (
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price : $ {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description :  {product.description}
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>

                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        {console.log(product.countInStock)}
                                        <Col><strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x) => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                            </Form.Control></Col>
                                    </Row>
                                </ListGroup.Item>}

                                <ListGroup.Item>
                                    <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>Add To Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>)}

        </>
    )
}
