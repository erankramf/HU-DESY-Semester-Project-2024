import * as React from 'react';
import { Autocomplete, Box, Button, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material"
import { useEffect, useState } from 'react';


interface Props {
    items: string[],
    title: string,
    onChoseItem: (chosenItem: string[]) => void
}

export const ClickableListMultiple = ({ items, title, onChoseItem }: Props) => {
    const [searchedValue, setSearchedValue] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => setSelectedItems([]), [items]);


    const handleItemClick = (item: string) => {
        const updatedSelectedItems = selectedItems.includes(item)
            ? selectedItems.filter(selectedItem => selectedItem !== item)
            : [...selectedItems, item];
        setSelectedItems(updatedSelectedItems);
    };

    const handleFinishSelection = () => {
        onChoseItem(selectedItems);
    };

    return <>
        <Typography variant='h4' align='center'>{title}</Typography>
        <Autocomplete
            freeSolo
            options={items}
            renderInput={(params) => <TextField {...params} label="Search" />}
            onInputChange={(event, value, reason) => {
                value = value || ""
                setSearchedValue(value);
                console.log(value);
            }}
        />
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: 1,
            overflow: "hidden",
            overflowY: "auto",
        }}>
            <List sx={{ p: 1, height: 1 }}>
                {items.map((item) => (item.includes(searchedValue) &&
                    <ListItem key={item} sx={{ p: 0, width: 1, backgroundColor: selectedItems.includes(item) ? 'lightblue' : 'inherit' }}>
                        <ListItemButton sx={{ p: 0, width: 1 }} onClick={() => {
                            console.log(item);
                            handleItemClick(item);
                        }}>
                            <ListItemText sx={{ p: 0, width: 1 }} primary={item}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
        <Button variant="contained" onClick={handleFinishSelection}>Search</Button>
    </>
}