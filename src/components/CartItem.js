import { IconButton } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";

import tlou from "components/tlou.svg";
import cyber from "components/cyber.svg";
import dgb from "components/dgb.svg";
import gow from "components/gow.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "redux/ProductsReducer";

import { makeStyles } from "@material-ui/core/styles";

const cartItemStyles = makeStyles({
  main: { height: "145px", display: "flex", alignItems: "center", margin: 12 },
  image: { height: "100%" },
  title: {
    fontSize: "30px",
  },
  platforms: { fontSize: "14px" },
  textBox: {
    flex: 1,
    "& p": { textAlign: "left", margin: "0 0 12px 0 " },
  },
  price: {
    width: 360,
    fontSize: "30px",
    textAlign: "right",
  },
});

const CartItem = ({ id }) => {
  const picture = useMemo(() => {
    switch (id) {
      case "tlou_2_ps4":
        return tlou;
      case "cyberpunk_2077_multiplatform":
        return cyber;
      case "days_gone":
        return dgb;
      case "god_of_war":
        return gow;
      default:
        return;
    }
  }, [id]);

  const cart = useSelector((s) => s.products.cart);
  const products = useSelector((s) => s.products.products);

  const data = useMemo(() => products.filter((p) => p.id === id)[0], [
    products,
    id,
  ]);
  const quantity = useMemo(() => cart.filter((_id) => _id === id).length, [
    cart,
    id,
  ]);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch(addToCart(id));
  }, [id, dispatch]);
  const remove = useCallback(() => {
    dispatch(removeFromCart(id));
  }, [id, dispatch]);

  const styles = cartItemStyles();
  return (
    <div className={styles.main}>
      <img className={styles.main} src={picture} alt={""} />
      <div className={styles.textBox}>
        <p className={styles.title}>{data.name}</p>
        <p className={styles.platforms}>{data.platforms}</p>
      </div>
      <div>
        <IconButton onClick={remove}>
          <IndeterminateCheckBoxOutlinedIcon />
        </IconButton>
        {quantity}
        <IconButton onClick={add}>
          <AddBoxOutlinedIcon />
        </IconButton>
      </div>
      <p className={styles.price}>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(data.price * quantity)}
      </p>
    </div>
  );
};
export default CartItem;
