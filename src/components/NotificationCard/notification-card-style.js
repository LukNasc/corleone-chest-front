import { makeStyles } from "@mui/styles"
const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: 10,
        borderRadius: 4,
        background: theme.palette.primary.light
    }
}))

export default useStyles;