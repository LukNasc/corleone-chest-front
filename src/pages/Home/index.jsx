import React, { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";

import Api from "../../service/axios.config";

import ItemList from "../../components/ItemList";

function Home() {
    const [members, setMembers] = useState([]);
    const [filter, setFilter] = useState();

    const onHandleListUsers = async () => {
        try {
            const { data } = await Api.get("/members/list");
            setMembers(data);
        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        onHandleListUsers();
    }, [])

    const handleChangeInputFilter = ({ target: { value: passaport } }) => {
        if (passaport === 0) return setFilter();
        const member = members.filter(item => item.passaport === passaport);
        return setFilter(member);
    };

    return (
        <>
            <TextField style={{ width: "200px" }} variant="filled" defaultValue={0} label="Filtro por membro" onChange={handleChangeInputFilter} value={filter} select>
                <MenuItem value={0}>Todos</MenuItem>
                {members.map(({ name, passaport }) => <MenuItem key={passaport} value={passaport}>{name}</MenuItem>)}
            </TextField>
            {(filter || members).map(({ name, passaport }) => (
                <ItemList key={passaport} name={name} passaport={passaport} />
            ))}
        </>
    )
}

export default Home;