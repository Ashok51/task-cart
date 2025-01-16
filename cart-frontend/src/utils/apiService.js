import axios from "axios";

export const fetchCartData = async (setCart, checkGiftEligibility) => {
    try {
        const response = await axios.get("http://localhost:3000/show_cart");
        setCart(response.data);
        checkGiftEligibility(response.data.total_price);
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
};

export const fetchProductData = async (setProducts) => {
    try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

export const updateCartData = async (cart, selectedProduct, quantity, products, setCart, checkGiftEligibility) => {
    try {
        const selectedProductId = products.find(p => p.product_name === selectedProduct)?.id;
        if (!selectedProductId) {
            alert("Please select a valid product!");
            return;
        }

        const cartId = cart?.id;
        if (!cartId) {
            alert("No cart found!");
            return;
        }

        const response = await axios.patch(`http://localhost:3000/carts/${cartId}`, {
            cart: { product_id: selectedProductId, quantity: quantity }
        });

        setCart(response.data);
        checkGiftEligibility(response.data.total_price);
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};
