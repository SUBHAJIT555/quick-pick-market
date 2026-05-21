import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryFilter from "../shop/shop-filter/category-filter";
import ColorFilter from "../shop/shop-filter/color-filter";
import PriceFilter from "../shop/shop-filter/price-filter";
import ProductBrand from "../shop/shop-filter/product-brand";
import StatusFilter from "../shop/shop-filter/status-filter";
import TopRatedProducts from "../shop/shop-filter/top-rated-products";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ResetButton from "../shop/shop-filter/reset-button";

const ShopFilterOffCanvas = ({
  all_products,
  otherProps,
  right_side = false,
}) => {
  const { priceFilterValues, setCurrPage } = otherProps;
  const { filterSidebar } = useSelector((state) => state.shopFilter);
  const dispatch = useDispatch();

  // max price (capped at 10,000)
  const calculatedMaxPrice = all_products.reduce((max, product) => {
    return product.price > max ? product.price : max;
  }, 0);
  const maxPrice = Math.min(calculatedMaxPrice, 10000);

  return (
    <>
      <div
        className={`tp-filter-offcanvas-area scs-shop-offcanvas${
          filterSidebar ? " is-open offcanvas-opened" : ""
        }`}
        aria-hidden={!filterSidebar}
      >
        <div className="tp-filter-offcanvas-wrapper scs-shop-offcanvas__wrapper">
          <header className="scs-shop-offcanvas__header">
            <h2 className="scs-shop-offcanvas__title">Filters</h2>
            <button
              type="button"
              onClick={() => dispatch(handleFilterSidebarClose())}
              className="scs-shop-offcanvas__close tp-filter-offcanvas-close-btn filter-close-btn"
              aria-label="Close filters"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
              Close
            </button>
          </header>
          <div className="tp-shop-sidebar scs-shop-offcanvas__body scs-shop">
            {/* filter */}
            <PriceFilter
              priceFilterValues={priceFilterValues}
              maxPrice={maxPrice}
            />
            {/* status */}
            {/* <StatusFilter setCurrPage={setCurrPage} shop_right={right_side} /> */}
            {/* categories */}
            <CategoryFilter setCurrPage={setCurrPage} shop_right={right_side} />
            {/* color */}
            {/* <ColorFilter setCurrPage={setCurrPage} shop_right={right_side} /> */}
            {/* product rating */}
            <div className="scs-shop-offcanvas__extras">
              <TopRatedProducts />
            </div>
            {/* brand */}
            {/* <ProductBrand setCurrPage={setCurrPage} shop_right={right_side} /> */}
            {/* reset filter */}
            <ResetButton shop_right={right_side} />
          </div>
        </div>
      </div>

      {/* overlay start */}
      <div
        onClick={() => dispatch(handleFilterSidebarClose())}
        className={`body-overlay ${filterSidebar ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default ShopFilterOffCanvas;
