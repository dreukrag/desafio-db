import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CartItem from "./CartItem";
const cartStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fafafa",
    minHeight: "50vh",
    padding: "64px",
  },
  title: {
    fontSize: "69px",
    fontFamily: "Open Sans",
    textAlign: "left",
    flex: 1,
  },
  titlerow: {
    display: "flex",
    alignItems: "baseline",
  },
  items: {
    display: "flex",
    flexDirection: "column",
  },
  totalp: {
    display: "flex",
    justifyContent: "flex-end",
    "& p": {
      textAlign: "right",
      fontSize: "30px",
      fontWeight: "bold",
      display: "inline-block",
    },
  },
  total: {
    width: 120,
    marginRight: 12,
  },
});

const Cart = ({ toggle }) => {
  const cart = useSelector((s) => s.products.cart);
  const styles = cartStyles();
  const products = useSelector((s) => s.products.products);

  const itemsIds = [...new Set(cart)].sort();

  const items = useMemo(
    () => itemsIds.map((id) => <CartItem key={id} id={id} />),
    [itemsIds]
  );

  const total = useMemo(() => {
    let accum = 0;
    cart.forEach((id) => {
      accum += products.filter((p) => p.id === id)[0].price;
    });
    return accum;
  }, [cart, products]);
  return (
    <div className={styles.main}>
      <div className={styles.titlerow}>
        <p className={styles.title}>Cart</p>
        <IconButton onClick={toggle}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={styles.items}>
        {items}
        {items.length === 0 && <p>Your Cart is Empty</p>}
      </div>
      {items.length > 0 && (
        <div className={styles.totalp}>
          <p>Total</p>
          <p className={styles.total}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(total)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
