import React, { useState, useRef } from "react";
import { TextField, Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (query.trim()) {
      console.log("Searching for:", query);
      if (onSearch) {
        onSearch(query);
      }
      setQuery("");
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      sx={{ width: "100%", maxWidth: 700 }}
    >
      
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 20px rgba(255, 255, 255, 0.4)"
            : "0 0 0px rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.3 }}
        style={{ borderRadius: 24, width: "100%" }}
      >
        <TextField
          fullWidth
          inputRef={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search"
          variant="outlined"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 6,
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#fff",
                borderWidth: 2,
              },
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        />
      </motion.div>
    </MotionBox>
  );
};

export default SearchBox;
