import * as React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"


interface Props {
    items : string[],
    title : string,
    onChoseItem: (chosenItem:string) => void 
}

export const ClickableList = ({items,title,onChoseItem}:Props) => { 
    return <>
        <Typography variant='h4' align='center'>{title}</Typography>
        <Box sx={{          
            display: "flex",
            flexDirection: "column",
            height: 1,
            overflow: "hidden",
            overflowY: "auto",}}>
            <List sx={{p:1, height:1}}>
                {items.map((item)=>(
                    <ListItem key={item} sx={{p:0, width:1}}>
                        <ListItemButton sx={{p:0, width:1}} onClick={() => {
                            console.log(item);
                            onChoseItem(item);
                            }}>
                            <ListItemText sx={{p:0, width:1}} primary={item}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    </>
}