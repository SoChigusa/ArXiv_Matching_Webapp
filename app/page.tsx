// app/page.tsx
"use client"

import React from 'react';
import { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box, IconButton } from "@mui/material";

const mathjaxConfig = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
  },
};

interface PageProps {
  searchParams: {
    userId?: string;
  };
}

const HomePage: React.FC<PageProps> = ({ searchParams }) => {
  const { userId } = searchParams;
  const [htmlContent, setHtmlContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selections, setSelections] = useState<number[]>([]);
  const [isLastContent, setIsLastContent] = useState(false);

  const fetchHtmlData = async (index: number) => {
    if (!userId) return;
    const response = await fetch(`/api/upload_html?userId=${userId}&index=${index}`);
    const data = await response.json();
    setHtmlContent(data.html);
    setCurrentIndex(index);
    setIsLastContent(!data.html);
    if (!data.html) {
      // Trigger Python application to close the browser
      await fetch('/api/notify_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
    }
  };

  useEffect(() => {
    if (userId) {
      fetchHtmlData(0);  // Fetch the first content on mount
    }
  }, [userId]);

  const handleSelection = async (selection: number) => {
    // Save selections to the server
    await fetch('/api/save_selections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, selections: [...selections, selection] }),
    });
    setSelections([...selections, selection]);
    fetchHtmlData(currentIndex + 1);
  };

  return (
    <>
      {isLastContent ? (<p>The window will be automatically closed...</p>) : (
        <Box sx={{ textAlign: "center" }}>
          <IconButton onClick={() => handleSelection(1)} color="primary">
            <ThumbUpIcon />
          </IconButton>
          <IconButton onClick={() => handleSelection(2)} color="primary">
            <ThumbDownIcon />
          </IconButton>
        </Box>)}
      <MathJaxContext config={mathjaxConfig}>
        <MathJax key={currentIndex}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </MathJax>
      </MathJaxContext>
    </>
  );
};

export default HomePage;
