import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    dropdown: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        width: "100%",
        minHeight: 30,
        background: "white",
        position: "absolute",
        textTransform: "none",
        alignItems: "flex-start",
        zIndex: 9
    },
}))

export default useStyles