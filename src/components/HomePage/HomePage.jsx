import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SearchBox from "../SearchBox/SearchBox";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);

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
      const response = await fetch("http://72.61.245.169:8000/ask", {
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
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem", lg: "3.75rem" },
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
          sx={{ width: "100%", height: "100%" }}
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
              mb: 4,
            }}
          >
            <SearchBox onSearch={handleSearch} />
          </MotionBox>

          {/* Details box */}
          <MotionBox
            sx={{
              display: "flex",
              justifyContent: "center",
              px: 2,
              perspective: 1200,
            }}
          >
            <AnimatePresence mode="wait">
              <MotionPaper
                key={searchCount}
                initial={{ 
                  opacity: 0, 
                  rotateX: 90,
                  rotateY: -45,
                  scale: 0.5
                }}
                animate={{ 
                  opacity: 1, 
                  rotateX: 0,
                  rotateY: 0,
                  scale: 1,
                  boxShadow: "0 8px 32px rgba(25, 118, 210, 0.15)"
                }}
                exit={{
                  opacity: 0,
                  rotateX: -90,
                  rotateY: 45,
                  scale: 0.5,
                  transition: { duration: 0.4 }
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 16px 48px rgba(25, 118, 210, 0.25)"
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                elevation={0}
                sx={{
                  width: "100%",
                  maxWidth: 800,
                  minHeight: 300,
                  border: "2px solid #1976d2",
                  borderRadius: 3,
                  p: { xs: 3, sm: 4, md: 5 },
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <MotionBox
                  initial={{ opacity: 0, y: 30, rotateX: -45, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    px: { xs: 1, sm: 2, md: 3 },
                    py: 2,
                  }}
                >
                  {isLoading ? (
                    <MotionTypography
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      variant="h6"
                      sx={{ 
                        color: "#666", 
                        textAlign: "center",
                        width: "100%",
                        fontWeight: 500,
                      }}
                    >
                      Loading...
                    </MotionTypography>
                  ) : error ? (
                    <Typography
                      variant="h6"
                      sx={{ 
                        color: "#d32f2f", 
                        textAlign: "center",
                        width: "100%",
                        fontWeight: 500,
                      }}
                    >
                      {error}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#333",
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" },
                        fontWeight: 500,
                        lineHeight: 2,
                        letterSpacing: "0.01em",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {apiResponse}
                    </Typography>
                  )}
                </MotionBox>
              </MotionPaper>
            </AnimatePresence>
          </MotionBox>
        </MotionBox>
      )}
      </AnimatePresence>
    </MotionBox>
  );
};

export default HomePage;
