import { createTheme } from "@mui/material/styles";

import components from "./overrides"
import typography from "./typography"

const theme = createTheme({
    components,
    typography
})

export default theme;