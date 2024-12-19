const TableRow = ({ children, ...rest }) => {
  return (
    <tr role="row" {...rest}>
      {children}
    </tr>
  );
};

export default TableRow;