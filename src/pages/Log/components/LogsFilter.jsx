import React, { useState, useEffect } from "react";

import { FilledInput, Select, MenuItem, Icon, TextField, Button, Typography, Box } from "@mui/material"

import MembersController from "../../../controllers/Members"

import Filter from "../../../components/Filter";

import itemsList from "./lists/items.json"
import actionsList from "./lists/actions.json"
import useStyles from "./style";

const SELECT_PLACEHOLDER_ITEMS = "Por material"

function getStylesPerItems(listItems) {
    return {
        color: listItems.length === 1 && listItems[0] === SELECT_PLACEHOLDER_ITEMS && `#454545`,
    };
}


function LogsFilter({ onFilter, ...props }) {
    const [memberList, setMemberList] = useState([]);

    const [listItems, setListItems] = useState([SELECT_PLACEHOLDER_ITEMS]);
    const [action, setAction] = useState("Todos");
    const [member, setMember] = useState("");

    const [closeDropdown, setCloseDropdown] = useState(false);

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = () => {
        Promise.all([MembersController.list()]).then(([members]) => setMemberList(members))
    }

    const getMembersFiltered = () => {
        return member ? memberList.filter(({ name }) => name.includes(member)) : []
    }

    const handleChangeSelectPerItems = (event) => {
        const {
            target: { value },
        } = event;
        const newList = value.filter(item => item !== SELECT_PLACEHOLDER_ITEMS)
        setListItems(newList.length === 0 ? [SELECT_PLACEHOLDER_ITEMS] : newList);
    };

    const handleChangeSelectPerAction = ({ target: { value } }) => setAction(value)
    const handleChangePerMember = ({ target: { value } }) => {
        if (closeDropdown)
            setCloseDropdown(false);
        setMember(value);
    }

    const onSelectMember = (name) => {
        setMember(name);
        setCloseDropdown(true);
    }

    const handleFilter = () => {
        let filters = {}
        if (member) filters = { member }
        if (listItems.length > 0 && listItems[0] !== SELECT_PLACEHOLDER_ITEMS) filters = { ...filters, items: listItems }
        if (action !== "Todos") filters = { ...filters, action }
        onFilter(filters)
        props.onClose()
    }
    const handleCleanFilters = () => {
        setAction("Todos");
        setCloseDropdown(false)
        setListItems([SELECT_PLACEHOLDER_ITEMS])
        setMember("")
        onFilter({})
        props.onClose();
    }

    const styles = useStyles();

    return (
        <Filter {...props} onFilter={handleFilter} onCleanFilters={handleCleanFilters}>
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
            <Select
                input={<FilledInput disableUnderline startAdornment={<Icon>sync</Icon>} />}
                value={action}
                onChange={handleChangeSelectPerAction}
            >
                <MenuItem value={"Todos"} >
                    Todos
                </MenuItem>
                {actionsList.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
            <Box position="relative" width="100%">
                <TextField variant="filled" value={member} onChange={handleChangePerMember} placeholder="Por membro" style={{ width: "100%" }} InputProps={{ disableUnderline: true, startAdornment: <Icon>person</Icon> }} />
                {
                    getMembersFiltered().length > 0 && !closeDropdown && (
                        <Box className={styles.dropdown}>
                            {
                                getMembersFiltered().map(({ name, passaport }) => (
                                    <Button key={passaport} style={{ width: "100%", color: "#000", justifyContent: "flex-start" }} onClick={() => onSelectMember(name)}>
                                        {name} || {passaport}
                                    </Button>
                                ))
                            }
                        </Box>
                    )
                }
            </Box>
            {/* <TextField variant="filled" placeholder="Selecione um intervalo de datas" InputProps={{ disableUnderline: true, startAdornment: <Icon>calendar_month</Icon> }} /> */}
        </Filter>)
}

export default LogsFilter