import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "@/svg";
import { add_cart_product, quantityDecrement } from "@/redux/features/cartSlice";
import { remove_wishlist_product } from "@/redux/features/wishlist-slice";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { getSellingPrice } from "@/lib/cart-price";

const WishlistItem = ({ product }) => {
  const { _id, img, title } = product || {};
  const unitPrice = getSellingPrice(product);
  const { cart_products } = useSelector((state) => state.cart);
  const cartItem = cart_products.find((item) => item._id === _id);
  const quantity = cartItem?.orderQuantity ?? 0;
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(add_cart_product(product));
  };

  const handleDecrement = () => {
    if (cartItem) {
      dispatch(quantityDecrement(product));
    }
  };

  const handleRemovePrd = () => {
    dispatch(remove_wishlist_product({ title, id: _id }));
  };

  const handleOpenModal = () => {
    dispatch(handleProductModal({ ...product }));
  };

  return (
    <li className="scs-wishlist-page__row">
      <div className="scs-wishlist-page__product">
        <button
          type="button"
          className="scs-wishlist-page__thumb"
          onClick={handleOpenModal}
          aria-label={`View ${title}`}
        >
          <Image
            src={img}
            alt={title}
            width={88}
            height={100}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </button>
        <button type="button" className="scs-wishlist-page__name" onClick={handleOpenModal}>
          {title}
        </button>
      </div>

      <div className="scs-wishlist-page__price">
        <span className="scs-wishlist-page__price-value">₹{unitPrice?.toFixed(2)}</span>
      </div>

      <div className="scs-wishlist-page__quantity">
        <div className="scs-wishlist-page__qty-control">
          <button
            type="button"
            className="scs-wishlist-page__qty-btn"
            onClick={handleDecrement}
            aria-label="Decrease quantity"
            disabled={quantity === 0}
          >
            <Minus />
          </button>
          <span className="scs-wishlist-page__qty-value">{quantity}</span>
          <button
            type="button"
            className="scs-wishlist-page__qty-btn"
            onClick={handleAddProduct}
            aria-label="Increase quantity"
          >
            <Plus />
          </button>
        </div>
      </div>

      <div className="scs-wishlist-page__add-wrap">
        <button
          type="button"
          className="scs-wishlist-page__btn scs-wishlist-page__btn--primary scs-wishlist-page__btn--row"
          onClick={handleAddProduct}
        >
          Add to cart
        </button>
      </div>

      <div className="scs-wishlist-page__remove-wrap">
        <button
          type="button"
          className="scs-wishlist-page__remove"
          onClick={handleRemovePrd}
          aria-label={`Remove ${title}`}
        >
          ×
        </button>
      </div>
    </li>
  );
};

export default WishlistItem;
