import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    content: {
        display: "flex",
        gap: 10,
        marginBottom: 10,
        height: 200
    },
    profile: {
        display: "flex",
        alignItems: "center",
        gap: 40,
        width: "400px"
    },
    img_profile: { width: "100px", height: "90px" },
    timeline: {
        display: "flex",
        flexDirection:"column",
        flex: 1,
    }
}))

export default useStyles;