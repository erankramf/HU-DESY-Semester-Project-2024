import { useEffect, useState } from "react"
import { ClickableList } from "./ClickableList"
import { getData, getParams, getTelescopes, getVersions } from "../api/Service"
import { Box, Grid } from "@mui/material"
import { ClickableListV } from "./ClickableListV"

interface Props {
  onGotData: (data: any) => void
}
export const DataSelector = (props: Props) => {
  const [telescopesList, setTelescopesList] = useState([""]);
  const [telescopeName, setTelescopeName] = useState("");
  const [parameterName, setParameterName] = useState("");
  const [paramsList, setParamsList] = useState([""]);
  const [versionNames, setVersionNames] = useState([""]);
  const [versionList, setVersionList] = useState([""]);

  const getTelescopeList = () => {
    getTelescopes().then(value => {
      console.log(value)
      setTelescopesList(value.data);
    }).catch(err =>
      console.log(err));
  }

  const pickedTelescope = (telName: string) => {
    setTelescopeName(telName);
    setParamsList([]);
    setVersionList([]);
    props.onGotData("");
    getParams(telName).then(value => {
      console.log(value);
      setParamsList(value.data);
    }).catch(err =>
      console.log(err));
  }

  const pickedParam = (paramName: string) => {
    setParameterName(paramName);
    setVersionList([]);
    props.onGotData("");
    getVersions(telescopeName, paramName).then(value => {
      console.log(value);
      setVersionList(value.data);
    }).catch(err =>
      console.log(err));
  }

  const pickedVersions = (verNames: string[]) => {
    setVersionNames(verNames);
    getData(telescopeName, parameterName, verNames).then(value => {
      console.log(value);
      console.log(JSON.stringify(value.data, null, 2));
      props.onGotData(JSON.stringify(value.data, null, 2));
    }).catch(err =>
      console.log(err));
  }

  useEffect(() => getTelescopeList(), []);

  return <>

    <Grid container direction='row' sx={{ height: 1, width: 1 }}>
      <Grid item xs={4} sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        <ClickableList items={telescopesList} title='Telescopes' onChoseItem={pickedTelescope} >
        </ClickableList>
      </Grid>
      <Grid item xs={4} sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        <ClickableList items={paramsList} title='Parameters' onChoseItem={pickedParam} >
        </ClickableList>
      </Grid>
      <Grid item xs={4} sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        <ClickableListV items={versionList} title='Versions' onChoseItems={pickedVersions} >
        </ClickableListV>
      </Grid>
    </Grid>
  </>
}