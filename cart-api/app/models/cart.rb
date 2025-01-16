# frozen_string_literal: true

class Cart < ApplicationRecord
  has_many :cart_items, dependent: :destroy

  def total_price_after_bogo
    cart_items.includes(:product).sum do |cart_item|
      # Calculate how many items are actually chargeable (BOGO logic)
      chargeable_quantity = (cart_item.quantity / 2.0).ceil
      chargeable_quantity * cart_item.product.price
    end
  end
end
