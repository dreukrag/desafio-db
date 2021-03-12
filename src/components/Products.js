import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import { Collapse, IconButton } from "@material-ui/core";
import Cart from "./Cart";

const productsStyles = makeStyles(() => ({
  main: {
    backgroundColor: "#fafafa",
    minHeight: "100vh",
    padding: "64px",
  },
  title: {
    fontSize: "69px",
    fontFamily: "Open Sans",
    textAlign: "left",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: `auto auto auto auto`,
    "@media(max-width: 1024px)": {
      gridTemplateColumns: `auto auto auto`,
    },
    gridTemplateRows: `auto`,
    columnGap: `24px`,
    rowGap: `24px`,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  cart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    color: "#3877A1",
    fontSize: "33px",
    "& svg": {
      color: "#3877A1",
    },
  },
}));
const Products = () => {
  const styles = productsStyles();
  const products = useSelector((s) => s.products.products);
  const cart = useSelector((s) => s.products.cart);
  const productsMemo = useMemo(() => {
    return products.map(({ name, id, price, platforms }) => (
      <Item {...{ name, id, price, platforms, cart }} />
    ));
  }, [products, cart]);

  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((old) => !old), [setOpen]);
  return (
    <>
      <Collapse in={open}>
        <Cart toggle={toggle} />
      </Collapse>
      <div className={styles.main}>
        <div className={styles.row}>
          <p className={styles.title}>Products</p>
          <div className={styles.cart}>
            <IconButton onClick={toggle}>
              <FontAwesomeIcon icon={faShoppingCart} />
            </IconButton>
            {cart.length}
          </div>
        </div>
        <div className={styles.grid}>{productsMemo}</div>
      </div>
    </>
  );
};

export default Products;
