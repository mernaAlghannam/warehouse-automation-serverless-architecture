import {IShipperData} from "../types/api_types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */


/**
 * This is the component where you should write the code for displaying the
 * the table of shipper information.
 *
 * You might need to change the signature of this function.
 *
 */
export const ShippersTable = ({shipperInfo, load}:{shipperInfo: IShipperData[], load: boolean} ) => {
  return (
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        {/* displays all column name from gradeList  */}
        <TableCell align="right">Shipper ID</TableCell>
        <TableCell align="right"># Boxes Received</TableCell>
        <TableCell align="right">Date</TableCell>
        <TableCell align="right">Shippment ID</TableCell>
        <TableCell align="right">Shipping PO</TableCell>
        <TableCell align="right">Warehouse ID</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {/* displays all data in gradeList to table */}
      {shipperInfo.map((row) => (
        <TableRow
          key={row.ShipperID}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.ShipperID}
          </TableCell>
          <TableCell align="right">{row.BoxesRcvd}</TableCell>
          <TableCell align="right">{row.Date}</TableCell>
          <TableCell align="right">{row.ShipmentID}</TableCell>
          <TableCell align="right">{row.ShippingPO}</TableCell>
          <TableCell align="right">{row.WarehouseID}</TableCell>
        </TableRow>
      ))}
    </TableBody>
              </Table>
              </TableContainer>

);
};

