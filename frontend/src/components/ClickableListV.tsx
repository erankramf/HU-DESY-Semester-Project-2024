import * as React from 'react';
import { Autocomplete, Box, Button, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material"
import { useState } from 'react';


interface Props {
    items: string[],
    title: string,
    onChoseItems: (chosenItem: string[]) => void
}

export const ClickableListV = ({ items, title, onChoseItems }: Props) => {
    const [searchedValue, setSearchedValue] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleItemClick = (item: string) => {
        const updatedSelectedItems = selectedItems.includes(item)
            ? selectedItems.filter(selectedItem => selectedItem !== item)
            : [...selectedItems, item];
        setSelectedItems(updatedSelectedItems);
    };

    const handleFinishSelection = () => {
        onChoseItems(selectedItems);
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
                    <ListItem key={item} sx={{ p: 0, width: 1 }}>
                        <ListItemButton
                            sx={{ p: 0, width: 1 }}
                            onClick={() => handleItemClick(item)}
                            selected={selectedItems.includes(item)}>
                            <ListItemText sx={{ p: 0, width: 1 }} primary={item}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
        <Button onClick={handleFinishSelection}>Finish Selection</Button>
    </>
}