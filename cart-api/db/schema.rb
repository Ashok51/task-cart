# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 20_250_115_111_235) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'cart_items', force: :cascade do |t|
    t.bigint 'cart_id', null: false
    t.bigint 'product_id', null: false
    t.integer 'quantity', default: 0
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['cart_id'], name: 'index_cart_items_on_cart_id'
    t.index ['product_id'], name: 'index_cart_items_on_product_id'
  end

  create_table 'carts', force: :cascade do |t|
    t.decimal 'total_price', precision: 10, scale: 2, default: '0.0', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'products', force: :cascade do |t|
    t.string 'product_name'
    t.string 'product_uniq_id', default: 'general-item', null: false
    t.decimal 'price'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  add_foreign_key 'cart_items', 'carts'
  add_foreign_key 'cart_items', 'products'
end