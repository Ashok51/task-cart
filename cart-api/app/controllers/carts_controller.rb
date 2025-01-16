# frozen_string_literal: true

class CartsController < ApplicationController
  def update
    @cart = if Cart.any?
              Cart.find(params[:id])
            else
              Cart.create
            end

    product = Product.find(cart_params[:product_id])

    # Check if a cart item with the same product_id and cart_id already exists
    cart_item = @cart.cart_items.find_or_initialize_by(product_id: product.id)

    # Update the quantity and price if it exists, otherwise create a new one

    cart_item.quantity += cart_params[:quantity]
    # cart_item.price = product.price * cart_item.quantity
    cart_item.save!

    # check BOGO offer
    total_cart_price = @cart.total_price_after_bogo

    # add sku-mug-offer
    product_id = offer_product_id

    add_offer_sku_mug_to_cart(product_id) if total_cart_price > 100

    # Update the total price of the cart
    @cart.update(
      total_price: total_cart_price
    )

    render json: @cart.as_json(include: {
                                 cart_items: {
                                   include: :product
                                 }
                               }), status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Cart or Product not found' }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def show_cart
    @cart = if Cart.any?
              Cart.includes(cart_items: :product).first
            else
              Cart.create
            end

    if @cart.present?
      render json: @cart.as_json(include: {
                                   cart_items: {
                                     include: :product
                                   }
                                 }), status: :ok
    else
      render json: { error: 'Cart not found' }, status: :not_found
    end
  end

  private

  def offer_product_id
    Product.find_by(product_uniq_id: 'offer_item').id
  end

  def add_offer_sku_mug_to_cart(product_id)
    @cart.cart_items
         .find_or_create_by(product_id: product_id, quantity: 1)
         .save!
  end

  def cart_params
    params.require(:cart).permit(:product_id, :quantity)
  end
end
