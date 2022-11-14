const MuiFilledInput = {
    styleOverrides: {
        root: {
            background: "rgba(0,0,0,0.11)",
            borderRadius: 4,
            gap: 10,
            color: "#fff !important",
            '.material-icons': {
                color: "#454545",
            },
        },
        input: {
            paddingTop: 15,
            paddingBottom: 15,

            "::placeholder": { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: "#454545",
                opacity: 1 /* Firefox */
            },

            ":-ms-input-placeholder": { /* Internet Explorer 10-11 */
                color: "#454545",
            },

            "::-ms-input-placeholder": { /* Microsoft Edge */
                color: "#454545",
            }
        }
    }
}

export default MuiFilledInput