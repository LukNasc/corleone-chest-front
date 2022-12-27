import { createTheme } from "@mui/material/styles";

import components from "./overrides"
import typography from "./typography"
import palette from "./palette";

const theme = createTheme({
    components,
    typography,
    palette,
})

export default theme;