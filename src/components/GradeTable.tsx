import { IStudentsGrades } from "../types/api_types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  studentId: string,
  studentName: string,
  classId: string,
  classTitle: string,
  semester: string,
  grade: number,
) {
  return { studentId, studentName, classId, classTitle, semester, grade };
}

/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
export function dummyData() {
  return [createData("U123", "Merna", "C123", "ST197", "fall2022", 400),
  createData("U125", "Lucie", "C123","ST197", "fall2022", 400),
  createData("U126", "Conor", "C123","ST197", "fall2022", 0),
  createData("U127", "Perry", "C123","ST197", "fall2022", 0),
  createData("U129", "Maria", "C123","ST197", "fall2022", 400)];
}

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable = ({gradesList, load}:{gradesList: IStudentsGrades[], load: boolean} ) => {
  return (
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        {/* displays all column name from gradeList  */}
        <TableCell>Student ID</TableCell>
        <TableCell align="right">Student Name</TableCell>
        <TableCell align="right">Class ID</TableCell>
        <TableCell align="right">Class Name</TableCell>
        <TableCell align="right">Semester</TableCell>
        <TableCell align="right">Grade</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {/* displays all data in gradeList to table */}
      {gradesList.map((row) => (
        <TableRow
          key={row.studentId}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.studentId}
          </TableCell>
          <TableCell align="right">{row.studentName}</TableCell>
          <TableCell align="right">{row.classId}</TableCell>
          <TableCell align="right">{row.className}</TableCell>
          <TableCell align="right">{row.semester}</TableCell>
          <TableCell align="right">{row.grade}</TableCell>
        </TableRow>
      ))}
    </TableBody>
              </Table>
              </TableContainer>

);
};

