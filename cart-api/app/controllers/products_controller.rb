# frozen_string_literal: true

class ProductsController < ApplicationController
  def index
    @products = Product.without_offer_item

    render json: @products, status: :ok
  end
end
