import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useSelector, useDispatch } from 'react-redux';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png";



const Header = () => {
    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div><Navbar bg="dark" variant='dark' expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >
                        <img src={logo} alt="logo" />
                        Proshop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart /> Cart
                                {cartItems.length > 0 && (<Badge pill bg='success' style={{ margin: "5px" }}>
                                    {cartItems.reduce((c, x) => c + x.qty, 0)}
                                </Badge>)}
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (<NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>) : (<LinkContainer to="/login">
                            <Nav.Link ><FaUser /> Signin</Nav.Link>
                        </LinkContainer>)}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title="Admin" id="adminmenu">
                                <LinkContainer to="/admin/productlist" >
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/userlist" >
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orderlist" >
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar></div>
    )
}

export default Header