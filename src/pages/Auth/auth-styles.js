import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    logo: { width: 100, height: 100 },
    authCard: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "white",
        width: 400,
        padding: 10,
        marginTop: 100,
        borderRadius: 4
    }
}))

export default useStyles