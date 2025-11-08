import { Button } from "@mui/material"


export default function MintButton({ text, type="button", onClick, icon = null }) {
    return (
        <div>
            <Button
                type={type}
                fullWidth
                variant="contained"
                onClick={onClick}

                sx={{
                    backgroundColor: "#8AC197",
                    color: "white",
                    py: 1.5,
                    px: 4,
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: '1.2rem',

                    "&:hover": {
                        backgroundColor: "#56A268",
                    },

                }}
                startIcon={icon}
            >
                {text}
            </Button>
        </div>
    )
}
