import { useFetch, usePagination } from "../../hooks";

import Table from "../Table/Table";
import TableCell from "../Table/TableCell";
import TableHeader from "../Table/TableHeader";
import TableRow from "../Table/TableRow";
import TableBody from "../Table/TableBody";
import Pagination from "../Pagination";
import TableSkeleton from "./ProjectsLoaderSkeleton";

import {
  KICKSTARTER_PROJECTS_API_URL,
  DEFAULT_TABLE_PAGE_SIZE,
  KICKSTARTER_PROJECTS_TABLE_COLS,
} from "../../constants/api_constants";

import "./styles.css";

const KickstarterProjects = () => {
  const {
    loading,
    error,
    value = [],
  } = useFetch(KICKSTARTER_PROJECTS_API_URL, {}, []);
  const { page, action } = usePagination(value, DEFAULT_TABLE_PAGE_SIZE, 4, [
    loading,
  ]);

  if (error) return <p>Error: {error.message}</p>;

  if (loading) {
    return (
      <div className="projects-container">
        <h1>Kickstarter Projects</h1>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="projects-container">
      <h1>Kickstarter Projects</h1>
      <div className="table-container">
        <Table aria-label="Kickstarter Projects">
          <TableHeader>
            <TableRow role="col">
              {KICKSTARTER_PROJECTS_TABLE_COLS.map((column) => (
                <TableCell key={column.id} isHeader>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {value.length > 0 ? (
              page.data.map((project) => {
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
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="center"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <p>No projects found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination page={page} action={action} />
    </div>
  );
};

export default KickstarterProjects;
