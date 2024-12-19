const TableCell = ({ children, isHeader, ...rest }) => {
  const Cell = isHeader ? "th" : "td";
  return (
    <Cell role="cell" {...rest}>
      {children}
    </Cell>
  );
};

export default TableCell;