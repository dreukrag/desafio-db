import React, { useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import tlou from "components/tlou.svg";
import cyber from "components/cyber.svg";
import dgb from "components/dgb.svg";
import gow from "components/gow.svg";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "redux/ProductsReducer";

const itemStyles = makeStyles(() => ({
  item: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  cover: {
    width: "78%",
  },
  blueButton: {
    color: "#fff",
    backgroundColor: "#3877A1",
    borderRadius: "4px",
    borderColor: "unset",
    boxShadow: "unset",
    height: "60px",
    width: "78%",
    margin: "24px 0",
  },
  redButton: {
    color: "#fff",
    backgroundColor: "#D55454",
    borderRadius: "4px",
    borderColor: "unset",
    boxShadow: "unset",
    height: "60px",
    width: "78%",
    margin: "24px 0",
  },
  spacing: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    "& p": {
      textAlign: "left",
      color: "#333333",
    },
  },
  name: {
    fontSize: "33px",
    fontFamily: "Open Sans",
  },
  platform: {
    fontSize: "14px",
    fontFamily: "Open Sans",
  },
  info: {
    margin: "20px 0 0 20px",
  },
  price: {
    borderRadius: "0 0 16px 16px",
    backgroundColor: "#333333",
    color: "#fff",
    height: "78px",
    width: "119px",
    fontSize: "33px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const Item = ({ name, id, price, platforms, cart }) => {
  const styles = itemStyles();
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch(addToCart(id));
  }, [id, dispatch]);
  const remove = useCallback(() => {
    dispatch(removeFromCart(id));
  }, [id, dispatch]);
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

  const cartButton = useMemo(() => {
    if (cart.indexOf(id) > -1)
      return (
        <Button className={styles.redButton} onClick={remove} color="D55454">
          Remove from cart
        </Button>
      );
    return (
      <Button className={styles.blueButton} onClick={add}>
        Add to cart
      </Button>
    );
  }, [cart, id, add, remove, styles]);
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.platform}>{platforms.join(", ")}</p>
        </div>
        <div className={styles.price}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(price)}
        </div>
      </div>
      <div className={styles.spacing}>
        <img className={styles.cover} alt={name} src={picture} />
        {cartButton}
      </div>
    </div>
  );
};
export default Item;
