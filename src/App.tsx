import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import key from "./api-key.json"
/**
 * You will find globals from this file useful!
 */
import {BASE_API_URL, MY_BU_ID} from "./globals";
import { IShipperData } from "./types/api_types";
import { GradeTable } from "./components/GradeTable";

function App() {
  // You will need to use more of these!
  let [currClassId, setCurrClassId] = useState<string>("");
  let [studentsGradesList, setStudentsGradesList] = useState<IShipperData[]>([]);
  const [classList, setClassList] = useState<any[]>([]);
  let [loading, setLoading] = useState<boolean>(false);
  // let shipperInformation : IShipperData[] = []
  

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

    console.log(key["api-key"])
    // TODO: MUST FIGURE OUT HOW TO SET ENV VARIABLE process.env.REACT_APP_NOT_SECRET_CODE and use in react
    const res = await fetch("https://shipping-data-api.azurewebsites.net/api/get-shipping-data?code="+key["api-key"], {
      method: "GET",
      headers: {
        'accept': 'application/json'
      },
    }
    );
    const shippingData = await res.json();
    console.log(shippingData);

    setClassList(shippingData);
  };

  // the param is empty as you would want to fetch class list only when you refresh the page and only once
  useEffect(() => {
    fetchClassList();
  }, [])

  // async/await function that calls calAllFinalGrade and sets the student grade list that will be displayed in table
  const fetchGradeData = async () => {
    // set loading to true to hide table and show "Loading..." symbol to indicate to user that 
    // data is being fetched
    await setLoading(true)

    let shipperInformation: IShipperData[]=[]
    await setStudentsGradesList([])
    for (const i in classList){
      if (classList[i].id == currClassId){
        for (const j in classList[i].Received){
          shipperInformation.push({ShipperID: classList[i].id, BoxesRcvd:classList[i].Received[j].BoxesRcvd, Date:classList[i].Received[j].Date,
             ShipmentID:classList[i].Received[j].ShipmentID, ShippingPO:classList[i].Received[j].ShippingPO, WarehouseID:classList[i].Received[j].WarehouseID})
          console.log(shipperInformation);
        }
        break;
      }
    }
    await setStudentsGradesList(shipperInformation);
    // set to false once the loading is complete
    await setLoading(false)
  }

  // this useeffect will be triggered if the current class id was changed
  useEffect(() => {
    // not fetch any grades when the current class id is empty
    if (currClassId !== "")
      fetchGradeData();
  }, [currClassId])

  // set the current class id to the one selected in dropdown menu
  const handleChange = (event: SelectChangeEvent) => {
    setCurrClassId(event.target.value);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Class</InputLabel>
            {/* call handlechange once a classId gets selected in order to set the current class id to the new one */}
            <Select fullWidth={true} value={currClassId} onChange={handleChange}>
              {/* Add each class id in class list as menu item in the drop down menu */}
          {classList.map((classList) => <MenuItem value={classList.id} key={classList.id}>{classList.id}</MenuItem>)}
            </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <div>
            {/* if data is loading, hide table and show text "Loading...", otherwise show table that 
            contains studentGradesList fetched from calFinalGrade function */}
            {loading ? <div>Loading...</div> : <GradeTable gradesList={studentsGradesList} load={loading}/>}
        </div>
        </Grid>
      </Grid>
    </div>   
  );
}

export default App;
