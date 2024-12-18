// import { useFetch } from "../hooks/useFetch";
// import { KICKSTARTER_PROJECTS_API_URL } from "../constants/api_constants";
import p from "../../constants/kickstarter_projects";
import Table from "../Table/Table";
import TableCell from "../Table/TableCell";
import TableHeader from "../Table/TableHeader";
import TableRow from "../Table/TableRow";
import TableBody from "../Table/TableBody";
import Pagination from "../Table/Pagination";
import { usePagination } from "../../hooks/usePagination";
import './styles.css';

const columns = [
  { id: "s.no", label: "S.No." },
  { id: "percentage.funded", label: "Percentage Funded" },
  { id: "amt.pledged", label: "Amount Pledged" },
];

const KickstarterProjects = () => {
  // const { loading, error, value } = useFetch(KICKSTARTER_PROJECTS_API_URL, {}, []);
  // console.log(loading, error, value);
  const { page, action } = usePagination(p, 5);
  return (
    <div className="projects-container">
      <h1>Kickstarter Projects</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} isHeader>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {page.data.map((project) => {
            const rowIndex = parseInt(project?.["s.no"], 10) + 1;
            const percentageFunded = `${project?.["percentage.funded"]}%`;
            const amountPledged = new Intl.NumberFormat(
              `en-${project?.["country"]}`,
              {
                style: "currency",
                currency: project?.["currency"],
              }
            ).format(project?.["amt.pledged"]);
            return (
              <TableRow key={project["s.no"]}>
                <TableCell>{rowIndex}</TableCell>
                <TableCell>{percentageFunded}</TableCell>
                <TableCell>{amountPledged}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination page={page} action={action} />
    </div>
  );
};

export default KickstarterProjects;
