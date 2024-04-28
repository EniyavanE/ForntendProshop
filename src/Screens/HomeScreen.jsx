import { Row, Col } from "react-bootstrap"
import Product from "../Components/Product.jsx"
import { useGetProductsQuery } from "../slices/productApiSlice.js"
import { Loader } from "../Components/Loader.jsx";


const HomeScreen = () => {

    const { data: products, isLoading, error } = useGetProductsQuery();
    return (
        <>
            {isLoading ? (<Loader />) : error ? (<h2>error?.data?.message</h2>) : (<Row>
                {products.map(product =>
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>)}
            </Row>)}

        </>
    )
}

export default HomeScreen