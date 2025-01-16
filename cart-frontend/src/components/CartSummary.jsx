const CartSummary = ({ cart }) => (
    <div className="card mb-4 shadow">
        {cart ? (
            <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <p>Total Price: <strong>${cart.total_price}</strong></p>
                {cart.cart_items.length > 0 && (
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>Product ID</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cart_items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.product.product_name}</td>
                                    <td>{item.product.product_uniq_id}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        ) : (
            <p>Loading cart...</p>
        )}
    </div>
  );
  
  export default CartSummary;
  