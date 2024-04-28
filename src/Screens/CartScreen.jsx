
import { Button, Card, Col, Image, ListGroup, Row, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlics"
export const CartScreen = () => {
    const cart = useSelector((state => state.cart))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = cart;
    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: "20px" }}>Shoppting Cart</h1>
                {cartItems.length === 0 ? (<h1>Cart is empty</h1>) : (<ListGroup variant="flush">
                    {cartItems.map((item) => (<ListGroup.Item key={item._id}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`products/${item._id}}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>
                            <Col md={2}>
                                <Form.Control as="select" value={item.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                    {[...Array(item.countInStock).keys()].map((x) => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                </Form.Control></Col>
                            <Col md={2}>
                                <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)}>
                                    <FaTrash /></Button>
                            </Col>

                        </Row>
                    </ListGroup.Item>))}
                </ListGroup>)}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                SubTotal: ({cartItems.reduce((cur, x) => cur + x.qty, 0)})
                            </h2>
                            $({cartItems.reduce((cur, x) => cur + x.qty * x.price, 0).toFixed(2)})
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}
