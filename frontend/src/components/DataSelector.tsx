import { useEffect, useState } from "react"
import { ClickableList } from "./ClickableList"
import { getParams, getTelescopes } from "../api/Service"
import { Box, Grid } from "@mui/material"

interface Props {

}
export const DataSelector = (props : Props) =>{
    const [telescopesList, setTelescopesList] = useState([""]);
    const [telescopeName, setTelescopeName] = useState("");
    const [parameterName, setParameterName] = useState("");
    const [paramsList, setParamsList] = useState([""]);

    const getTelescopeList = () => {
      getTelescopes().then(value=>{
        console.log(value)
        setTelescopesList(value.data);
      }).catch(err =>
        console.log(err));
      }

    const pickedTelescope = (telName:string) => {
      setTelescopeName(telName);
      getParams(telName).then(value =>{
        console.log(value);
        setParamsList(value.data);
      }).catch(err =>
        console.log(err));
    } 

    const pickedParam = (paramName:string) =>{
      setParameterName(paramName);
      //Add call to get versions
    }
    
    useEffect(() => getTelescopeList(),[]);

    return <>

        <Grid container direction='row' sx={{height:1, width:1}}>
            <Grid item xs={4} sx={{height:1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                }}>
                <ClickableList items={telescopesList} title='Telescopes' onChoseItem={pickedTelescope} >
                </ClickableList>
            </Grid>
            <Grid item xs={4} sx={{height:1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                }}>
                <ClickableList items={paramsList} title='Parameters' onChoseItem={() => {return null}  } >
                </ClickableList>
            </Grid>
            <Grid item xs={4} sx={{height:1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                }}>
                <ClickableList items={telescopesList} title='Telescopes' onChoseItem={() => {return null}  } >
                </ClickableList>
            </Grid>
        </Grid>
        {/* <Box sx={{height:1, width:1/3,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            }}>
            <ClickableList items={['1','2','3','4','5','6','7','8','9','10','12','13','14','15','16']} title='Telescopes' onChoseItem={() => {return null}  } >
            </ClickableList>
        </Box> */}
    </>
}