import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        width: "100%"
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        background: "#232323",
        paddingBottom: 44
    },
    logo: { width: 100, height: 90, marginTop: 35, marginBottom: 15 },
    menu: {
        background: "#333333",
        width: 350,
        height: "100vh",
        boxShadow: "1px 0px 30px #000"
    },
    menuItem: {
        display: "flex",
        gap: 10,
        width: "100%",
        height: 56,
        justifyContent: "flex-start !important",
        color: "white !important",
        textTransform: "none !important",
        fontWeight: "300 !important",
        fontSize: "15px !important",
        borderRadius: "0 !important",
        padding: "0 12px !important",
        "&.selected": {
            fontWeight: "bold !important",
            background: "#232323 !important"
        }
    },
    content: {
        width: "100%",
        maxHeight: "94vh",
        overflow: "auto",
        padding: 33,
    }
}))

export default useStyles;