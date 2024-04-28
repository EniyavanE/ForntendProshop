import { Spinner } from "react-bootstrap"

export const Loader = () => {
    return (
        <Spinner animation="border" style={{
            width: "100px",
            height: "100px",
            marginTop: "auto",
            display: "block",
        }} />
    )
}
