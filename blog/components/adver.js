import styles from "../styles/components/adver.module.css";
const Adver = () => {
  const sty = (...classNames) => classNames.join(" ");
  return (
    <div className={sty(styles.adver_div, styles.comm_box)}>
      <div
        className={sty(styles.adver_board)}
        style={{ background: "#2892d0" }}
      >
        广告位
      </div>
      <div
        className={sty(styles.adver_board)}
        style={{ background: "#63b2af" }}
      >
        广告位
      </div>
      <div
        className={sty(styles.adver_board)}
        style={{ background: "#f36563" }}
      >
        广告位
      </div>
      <div
        className={sty(styles.adver_board)}
        style={{ background: "#2050a3" }}
      >
        广告位
      </div>
    </div>
  );
};
export default Adver;
