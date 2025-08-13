import { Button } from "@mui/material"


export default function TealButton({ text, onClick, icon = null }) {
    return (
        <div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={onClick}

                sx={{
                    backgroundColor: "#468F9D",
                    color: "white",
                    py: 1.5,
                    px: 4,
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: '1.5rem',

                    "&:hover": {
                        backgroundColor: "#26a69a",
                    },

                }}
                startIcon={icon}
            >
                {text}
            </Button>
        </div>
    )
}
