import React, { useState } from "react";

import { Select, FilledInput, Typography, MenuItem, Icon } from "@mui/material"

import Filter from "../../../components/Filter"
import itemsList from "../../Log/components/lists/items.json"

const SELECT_PLACEHOLDER_ITEMS = "Por material"

function getStylesPerItems(listItems) {
    return {
        color: listItems.length === 1 && listItems[0] === SELECT_PLACEHOLDER_ITEMS && `#454545`,
    };
}


function ChestFilter({ onFilter, ...props }) {

    const [listItems, setListItems] = useState([SELECT_PLACEHOLDER_ITEMS]);

    const handleChangeSelectPerItems = (event) => {
        const {
            target: { value },
        } = event;
        const newList = value.filter(item => item !== SELECT_PLACEHOLDER_ITEMS)
        setListItems(newList.length === 0 ? [SELECT_PLACEHOLDER_ITEMS] : newList);
    };

    const handleFilter = () => {
        let filters = {}
        if (listItems.length > 0 && listItems[0] !== SELECT_PLACEHOLDER_ITEMS) filters = { ...filters, items: listItems }
        onFilter(filters)
        props.onClose()
    }
    const handleCleanFilters = () => {
        setListItems([SELECT_PLACEHOLDER_ITEMS])
        onFilter({})
        props.onClose();
    }

    return <Filter {...props} onFilter={handleFilter} onCleanFilters={handleCleanFilters}>
        <Select
            input={<FilledInput disableUnderline startAdornment={<Icon>search</Icon>} />}
            value={listItems}
            multiple
            onChange={handleChangeSelectPerItems}
            renderValue={(selected) => <Typography style={getStylesPerItems(listItems)}>{selected.join(", ")}</Typography>}
        >
            {itemsList.map((item) => (
                <MenuItem
                    key={item}
                    value={item}
                >
                    {item}
                </MenuItem>
            ))}
        </Select>
    </Filter>
}

export default ChestFilter