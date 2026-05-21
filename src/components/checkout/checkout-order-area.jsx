import { useSelector } from "react-redux";
import useCartInfo from "@/hooks/use-cart-info";
import { getSellingPrice } from "@/lib/cart-price";

const CheckoutOrderArea = ({ checkoutData }) => {
  const { submitting, error } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  const { total: cartTotal } = useCartInfo();

  return (
    <div className="scs-checkout__order">
      <h2 className="scs-checkout__order-title">Your order</h2>

      <ul className="scs-checkout__order-list">
        <li className="scs-checkout__order-head">
          <span>Product</span>
          <span>Total</span>
        </li>

        {cart_products.map((item) => {
          const unit = getSellingPrice(item);
          const line = unit * item.orderQuantity;
          return (
            <li key={item._id} className="scs-checkout__order-row">
              <p className="scs-checkout__order-product">
                {item.title} <span className="scs-checkout__order-qty">× {item.orderQuantity}</span>
              </p>
              <span className="scs-checkout__order-line">₹{line.toFixed(2)}</span>
            </li>
          );
        })}

        <li className="scs-checkout__order-subtotal">
          <span>Subtotal</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </li>

        <li className="scs-checkout__order-total">
          <span>Total</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </li>
      </ul>

      {error && <div className="scs-checkout__error" role="alert">{error}</div>}

      <div className="scs-checkout__submit-wrap">
        <button type="submit" disabled={submitting} className="scs-checkout__submit">
          {submitting ? "Sending…" : "Ask for quote"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
