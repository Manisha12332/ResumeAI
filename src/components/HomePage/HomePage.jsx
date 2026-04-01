import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SearchBox from "../SearchBox/SearchBox";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const HomePage = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchCount((prev) => prev + 1);
    setIsSearched(true);
    setIsLoading(true);
    setError(null);
    setApiResponse("");

    try {
      const response = await fetch("https://resumeai-gfjr.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      setApiResponse(data.answer || data.response || JSON.stringify(data));
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MotionBox
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: isSearched ? "20px" : "60px 20px 20px 20px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000000",
      }}
    >
      {/* Animated floating orbs */}
      <motion.div
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{
          x: [0, -80, 30, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30, 144, 255, 0.25) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "50%",
          right: "30%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 105, 180, 0.2) 0%, transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />

      <AnimatePresence mode="wait">
        {!isSearched ? (
        // Initial centered layout
        <MotionBox
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            width: "100%",
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <MotionTypography
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 30px rgba(255, 255, 255, 0.8)"
            }}
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem", lg: "4.5rem" },
            }}
          >
            ResumeAI
          </MotionTypography>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <SearchBox onSearch={handleSearch} />
          </MotionBox>
        </MotionBox>
      ) : (
        // After search layout
        <MotionBox 
          key="searched"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          sx={{ 
            width: "100%", 
            height: "calc(100vh - 40px)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
          }}
        >
          {/* Fixed Header with title and search box */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "#000000",
              pb: 2,
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-20px",
                left: 0,
                right: 0,
                height: "20px",
                background: "linear-gradient(to bottom, #000000 0%, transparent 100%)",
                pointerEvents: "none",
              },
            }}
          >
            {/* Header with title on left */}
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3,
              }}
            >
              <MotionTypography
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variant="h5"
                onClick={() => {
                  setIsSearched(false);
                  setSearchQuery("");
                }}
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  cursor: "pointer",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                ResumeAI
              </MotionTypography>
            </MotionBox>

            {/* Search box at top center */}
            <MotionBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SearchBox onSearch={handleSearch} />
            </MotionBox>
          </Box>

          {/* Scrollable Answer area */}
          <MotionBox
            sx={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              px: 2,
              pt: 2,
              scrollBehavior: "smooth",
              backgroundColor: "transparent",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            <AnimatePresence mode="wait">
              <MotionBox
                key={searchCount}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                sx={{
                  width: "100%",
                  maxWidth: 700,
                  textAlign: "left",
                  px: { xs: 1, sm: 2 },
                  pb: 4,
                }}
              >
                {isLoading ? (
                  <MotionTypography
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    variant="body1"
                    sx={{ 
                      color: "rgba(255, 255, 255, 0.7)", 
                      textAlign: "center",
                      width: "100%",
                      fontWeight: 400,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                    }}
                  >
                    Loading...
                  </MotionTypography>
                ) : error ? (
                  <MotionTypography
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    variant="body1"
                    sx={{ 
                      color: "#ff6b6b", 
                      textAlign: "center",
                      width: "100%",
                      fontWeight: 400,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                    }}
                  >
                    {error}
                  </MotionTypography>
                ) : (
                  <MotionTypography
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
                      fontWeight: 400,
                      lineHeight: 1.8,
                      letterSpacing: "0.01em",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {apiResponse}
                  </MotionTypography>
                )}
              </MotionBox>
            </AnimatePresence>
          </MotionBox>
        </MotionBox>
      )}
      </AnimatePresence>
    </MotionBox>
  );
};

export default HomePage;
