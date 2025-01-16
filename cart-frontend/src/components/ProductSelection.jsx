const ProductSelection = ({ products, selectedProduct, setSelectedProduct, quantity, setQuantity, addToCart }) => (
  <div className="card p-4 shadow mb-4">
      <h2 className="card-title mb-3">Add Product to Cart</h2>
      <div className="row">
          <div className="col-md-5 mb-3">
              <label>Select Product</label>
              <select
                  className="form-select border-primary"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
              >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                      <option key={product.id} value={product.product_name}>
                          {product.product_name}
                      </option>
                  ))}
              </select>
          </div>
          <div className="col-md-3 mb-3">
              <label>Price</label>
              <input
                  type="text"
                  className="form-control border-primary"
                  value={selectedProduct ? `$${products.find(p => p.product_name === selectedProduct)?.price || 0}` : "-"}
                  readOnly
              />
          </div>
          <div className="col-md-2 mb-3">
              <label>Quantity</label>
              <input
                  type="number"
                  className="form-control border-primary"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Number(e.target.value))}
              />
          </div>
          <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-success w-100" onClick={addToCart}>Add to Cart</button>
          </div>
      </div>
  </div>
);

export default ProductSelection;