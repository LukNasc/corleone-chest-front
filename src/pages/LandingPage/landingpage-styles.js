import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
    },
    containerHeader: {
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    },
    logo: {
        width: "200px",
        height: "200px"
    },
    contentTitle: {
        width: "900px",
        textAlign: "center"
    },
    groupButtons: {
        marginTop: 50,
        display: "flex",
        gap: 10
    }
}))

export default useStyles