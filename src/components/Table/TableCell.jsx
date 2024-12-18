const TableCell = ({ children, isHeader }) => {
  const Cell = isHeader ? "th" : "td";
  return (
    <Cell>
      {children}
    </Cell>
  );
};

export default TableCell;