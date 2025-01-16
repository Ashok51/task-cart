import React, { useState, useEffect } from "react";
import CartSummary from "./CartSummary";
import ProductSelection from "./ProductSelection";
import { fetchCartData, fetchProductData, updateCartData } from "../utils/apiService";
import { Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CartComponent = () => {
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [remainingAmount, setRemainingAmount] = useState(0);

    useEffect(() => {
        fetchCartData(setCart, checkGiftEligibility);
        fetchProductData(setProducts);
    }, []);

    const addToCart = async () => {
        updateCartData(cart, selectedProduct, quantity, products, setCart, checkGiftEligibility);
    };

    const checkGiftEligibility = (totalPrice) => {
        if (totalPrice >= 100) {
            setShowPopup(false);
        } else {
            setShowPopup(true);
            setRemainingAmount(100 - totalPrice);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 text-primary">🛒 Shopping Cart</h1>
            <CartSummary cart={cart} />
            <ProductSelection 
                products={products}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                quantity={quantity}
                setQuantity={setQuantity}
                addToCart={addToCart}
            />
            <ToastContainer position="top-center">
                <Toast show={showPopup} bg="info" delay={3000} autohide>
                    <Toast.Body className="text-center">
                        Spend <strong>${remainingAmount}</strong> more to receive a free gift! 🎁
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default CartComponent;