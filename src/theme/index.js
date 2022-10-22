import { createTheme } from "@mui/material/styles";

import palette from "./palette"
import components from "./overrides"

const theme = createTheme({
    palette,
    components,
    typography: {
        fontFamily: "Propmpt, sans-serif"
    }
})

export default theme;