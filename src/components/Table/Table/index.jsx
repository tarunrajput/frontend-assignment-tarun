import "./styles.css";

const Table = ({ children, className, caption, ...rest }) => {
  return (
    <table className={`table ${className ? className : ""}`} role="table" {...rest}>
      {caption ? <caption>{caption}</caption> : null}
      {children}
    </table>
  );
};

export default Table;
