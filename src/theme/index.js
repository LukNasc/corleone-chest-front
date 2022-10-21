import { createTheme } from "@mui/material/styles";

import palette from "./palette"
import components from "./overrides"

const theme = createTheme({
    palette,
    components,
    typography: {
        fontFamily: "EB Garamond, serif"
    }
})

export default theme;