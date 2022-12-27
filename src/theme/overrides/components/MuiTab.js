import palette from "../../palette";

const MuiTab = {
    styleOverrides: {
        root: {
            color: palette.primary.light,
            fontWeight:400,
            "&.Mui-selected": {
                color:"white",
                fontWeight: "bold"
            }
        },
    }
}

export default MuiTab;