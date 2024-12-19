import Table from "../Table/Table";
import TableCell from "../Table/TableCell";
import TableHeader from "../Table/TableHeader";
import TableRow from "../Table/TableRow";
import TableBody from "../Table/TableBody";
import './skeleton.css';
const TableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[1, 2, 3].map((i) => (
            <TableCell key={i} isHeader>
              <div className="skeleton-cell skeleton-header" />
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((row) => (
          <TableRow key={row}>
            {[1, 2, 3].map((cell) => (
              <TableCell key={cell}>
                <div className="skeleton-cell" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;