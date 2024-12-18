import "./table.css";
const Table = ({ children, className }) => {
  return (
    <table className={`table ${className ? className : ""}`}>{children}</table>
  );
};

export default Table;
