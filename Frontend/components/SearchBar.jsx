import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

return (
    <TextField
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ flex: 1 }}
        slotProps={{
            input: {
                endAdornment: (
                    <IconButton onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                ),
            }
        }}
    />
);
}
