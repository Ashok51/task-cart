# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :product_name
      t.string :product_uniq_id, null: false, default: 'general-item'
      t.decimal :price

      t.timestamps
    end
  end
end
