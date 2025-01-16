# frozen_string_literal: true

class CreateCarts < ActiveRecord::Migration[7.1]
  def change
    create_table :carts do |t|
      t.decimal :total_price, precision: 10, scale: 2, default: 0.0, null: false

      t.timestamps
    end
  end
end
