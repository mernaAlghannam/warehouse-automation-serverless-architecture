import { FormEventHandler, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
/**
 * You will find globals from this file useful!
 */
import {BASE_API_URL, MY_BU_ID} from "./globals";
import { IShipperData } from "./types/api_types";
import { ShippersTable } from "./components/ShippersTable";

function App() {
  // You will need to use more of these!
  let [currShipperID, setCurrShipperID] = useState<string>("");
  let [shipperInfoList, setShipperInfoList] = useState<IShipperData[]>([]);
  const [shippersDataList, setShippersDataList] = useState<any[]>([]);
  let [loading, setLoading] = useState<boolean>(false);
  

// Using this function to update the state of fruit
// whenever a new option is selected from the dropdown
// props search

  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */

  /**
 * 
 * This is an async/wait function. It fetches the list of classes in a particular semester and sets 
 * classList to what is returned by the HTTP request
 * 
 * @param None
 * @returns None
 */
  const fetchClassList = async () => {

    // TODO: MUST FIGURE OUT HOW TO SET ENV VARIABLE process.env.REACT_APP_NOT_SECRET_CODE and use in react
    const res = await fetch("https://shipping-data-api.azurewebsites.net/api/get-shipping-data?code="+process.env.REACT_APP_NOT_SECRET_CODE, {
      method: "GET",
      headers: {
        'accept': 'application/json'
      },
    }
    );
    const shippingData = await res.json();
    console.log(shippingData);

    setShippersDataList(shippingData);
  };

  // the param is empty as you would want to fetch class list only when you refresh the page and only once
  useEffect(() => {
    fetchClassList();
  }, [])

  // async/await function that TODO
  const fetchShipperData = async () => {
    // set loading to true to hide table and show "Loading..." symbol to indicate to user that 
    // data is being fetched
    await setLoading(true)

    let shipperInformation: IShipperData[]=[]
    await setShipperInfoList([])
    for (const i in shippersDataList){
      if (shippersDataList[i].id == currShipperID){
        for (const j in shippersDataList[i].Received){
          shipperInformation.push({ShipperID: shippersDataList[i].id, BoxesRcvd:shippersDataList[i].Received[j].BoxesRcvd, Date:shippersDataList[i].Received[j].Date,
             ShipmentID:shippersDataList[i].Received[j].ShipmentID, ShippingPO:shippersDataList[i].Received[j].ShippingPO, WarehouseID:shippersDataList[i].Received[j].WarehouseID})
          console.log(shipperInformation);
        }
        break;
      }
    }
    await setShipperInfoList(shipperInformation);
    // set to false once the loading is complete
    await setLoading(false)
  }

  // this useeffect will be triggered if the current class id was changed
  // useEffect(() => {
  //   // not fetch any grades when the current class id is empty
  //   if (currShipperID !== "")
  //     fetchShipperData();
  // }, [currShipperID])

  // set the current class id to the one selected in dropdown menu
  const handleChange = (event: any) => {
    setCurrShipperID(event.target.value);
  };

  const handleSubmit = (event: any) => {
    if (currShipperID !== "")
      fetchShipperData();
    event.preventDefault();
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Warehouse Automator
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
           Type a Shipper ID 
          </Typography>
          <Typography variant="h6" gutterBottom>
           Example: Merna123
          </Typography>
          <div style={{ width: "100%" }}>
          {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Shipper ID</InputLabel>
            {/* call handlechange once a classId gets selected in order to set the current class id to the new one */}
            {/* <Select fullWidth={true} value={currShipperID} onChange={handleChange}> */}
              {/* Add each class id in class list as menu item in the drop down menu */}
          {/* {shippersDataList.map((shipperDataList) => <MenuItem value={shipperDataList.id} key={shipperDataList.id}>{shipperDataList.id}</MenuItem>)}
            </Select>
            </FormControl> */}
      <form onSubmit={handleSubmit}>
          <input type="text" value={currShipperID} onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Shipping Boxes Received Items:
          </Typography>
          <div>
            {/* if data is loading, hide table and show text "Loading...", otherwise show table that 
            contains studentGradesList fetched from calFinalGrade function */}
            {loading ? <div>Loading...</div> : <ShippersTable shipperInfo={shipperInfoList} load={loading}/>}
        </div>
        </Grid>
      </Grid>
    </div>   
  );
}

export default App;
