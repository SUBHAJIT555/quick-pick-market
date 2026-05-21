import React, { useCallback } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Cart, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { notifyError } from "@/utils/toast";

const ProductSliderItem = ({ product, suppressClickRef }) => {
  const { _id, title, price, discountedPrice, img, status } = product || {};
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = cart_products.some((prd) => prd._id === _id);
  const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  const dispatch = useDispatch();

  const sellingPrice =
    discountedPrice && discountedPrice < price ? discountedPrice : price;
  const originalPrice =
    discountedPrice && discountedPrice < price ? price : null;
  const discountPct =
    originalPrice && originalPrice > 0
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
      : null;

  const openModal = () => {
    dispatch(handleProductModal({ ...product }));
  };

  const handleAddProduct = () => {
    if (status === "out-of-stock") {
      notifyError("This product is out of stock");
    } else {
      dispatch(add_cart_product(product));
    }
  };

  const handleWishlistProduct = () => {
    dispatch(add_to_wishlist(product));
  };

  const outOfStock = status === "out-of-stock";

  const stopToolbarDrag = (e) => e.stopPropagation();

  const handleModalClick = useCallback(() => {
    if (suppressClickRef?.current) {
      suppressClickRef.current = false;
      return;
    }
    dispatch(handleProductModal({ ...product }));
  }, [suppressClickRef, dispatch, product]);

  return (
    <article className={`scs-product-card${outOfStock ? " is-out-of-stock" : ""}`}>
      <div className="scs-product-card__media">
        <button
          type="button"
          className="scs-product-card__img-btn"
          onClick={handleModalClick}
          aria-label={`View ${title}`}
        >
          <Image
            src={img}
            alt={title}
            width={280}
            height={320}
            sizes="(max-width: 576px) 85vw, 240px"
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </button>

        {discountPct > 0 && !outOfStock && (
          <span className="scs-product-card__sale">-{discountPct}%</span>
        )}
        {outOfStock && (
          <span className="scs-product-card__status">Sold out</span>
        )}

        <div className="scs-product-card__toolbar" onPointerDown={stopToolbarDrag}>
          <button
            type="button"
            onClick={handleAddProduct}
            onPointerDown={stopToolbarDrag}
            className={`scs-product-card__tool${isAddedToCart ? " is-active" : ""}`}
            disabled={outOfStock}
            aria-label="Add to cart"
          >
            <Cart />
          </button>
          <button
            type="button"
            onClick={openModal}
            onPointerDown={stopToolbarDrag}
            className="scs-product-card__tool"
            aria-label="Quick view"
          >
            <QuickView />
          </button>
          <button
            type="button"
            onClick={handleWishlistProduct}
            onPointerDown={stopToolbarDrag}
            className={`scs-product-card__tool${isAddedToWishlist ? " is-active" : ""}`}
            aria-label="Add to wishlist"
          >
            <Wishlist />
          </button>
        </div>
      </div>

      <div className="scs-product-card__body">
        <h3 className="scs-product-card__title">
          <button
            type="button"
            className="scs-product-card__title-btn"
            onClick={handleModalClick}
          >
            {title}
          </button>
        </h3>
        <div className="scs-product-card__price">
          <span className="scs-product-card__price-current">₹{sellingPrice?.toFixed(2)}</span>
          {originalPrice && (
            <span className="scs-product-card__price-old">₹{originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductSliderItem;
