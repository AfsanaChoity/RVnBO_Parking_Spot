import { Button } from "@mui/material"


export default function MintButton({ text, onClick, icon = null }) {
    return (
        <div>
            <Button
                type="submit"
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
                    fontSize: '1.5rem',

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
