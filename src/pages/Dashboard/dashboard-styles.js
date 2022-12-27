import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        gap: 20
    },
    tabsSection: {
        padding: 10,
        borderRadius: 4,
        background: theme.palette.primary.main,
    }
}))
export default useStyles;