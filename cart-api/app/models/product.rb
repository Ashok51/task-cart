# frozen_string_literal: true

class Product < ApplicationRecord
  has_many :cart_items

  enum product_uniq_id: {
    offer_item: 'sku-mug-free',
    general_item: 'general-item'
  }

  scope :without_offer_item, -> { where.not(product_uniq_id: :offer_item) }
end
