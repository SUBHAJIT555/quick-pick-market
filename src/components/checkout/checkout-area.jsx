import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";

const CheckoutArea = () => {
  const checkoutData = useCheckoutSubmit();
  const { handleSubmit, submitHandler, register, errors } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);

  return (
    <section className="scs-checkout">
      <div className="scs-checkout__inner">
        {cart_products.length === 0 ? (
          <div className="scs-checkout__empty">
            <h2>No items in cart</h2>
            <p>Add products to your cart before requesting a quote.</p>
            <Link href="/shop" className="scs-checkout__shop-btn">
              Return to shop
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitHandler)} className="scs-checkout__form">
            <div className="scs-checkout__grid">
              <div className="scs-checkout__col scs-checkout__col--main">
                <CheckoutBillingArea register={register} errors={errors} />
              </div>
              <div className="scs-checkout__col scs-checkout__col--aside">
                <CheckoutOrderArea checkoutData={checkoutData} />
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default CheckoutArea;
