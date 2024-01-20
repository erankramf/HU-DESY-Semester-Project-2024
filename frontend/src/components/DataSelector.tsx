import { useEffect, useState } from "react"
import { ClickableList } from "./ClickableList"
import { getParams, getTelescopes } from "../api/Service"
import { Box, Grid } from "@mui/material"

interface Props {

}
export const DataSelector = (props : Props) =>{
    const [text, setText] = useState([""])
    const [telescopeName, setTelescopeName] = useState("")
    
    const getT = () => {
      getTelescopes().then(value=>{
        console.log(value)
        setText(value.data);
      }).catch(err =>
        console.log(err));
      }

    const getP = () => {
      getParams(telescopeName).then(value=>{
        console.log(value)
        setText(value.data);
      }).catch(err =>
        console.log(err));
    };
    
    useEffect(() => getT(),[]);

    return <>

        <Grid container direction='row' sx={{height:1, width:1}}>
            <Grid item xs={4} sx={{height:1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                }}>
                <ClickableList items={text} title='Telescopes' onChoseItem={() => {return null}  } >
                </ClickableList>
            </Grid>
            <Grid item xs={4} sx={{height:1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                }}>
                <ClickableList items={[]} title='Parameters' onChoseItem={() => {return null}  } >
                </ClickableList>
            </Grid>
            <Grid item xs={4} sx={{height:1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                }}>
                <ClickableList items={text} title='Telescopes' onChoseItem={() => {return null}  } >
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