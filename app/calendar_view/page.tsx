"use client"

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Button, Typography } from '@mui/material';
import { fetchArxivData, getClosestWeekday } from '../../utils/arXiv.ts'

const Home: React.FC = () => {

  // Function to filter out weekends
  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 is Sunday, 6 is Saturday
  };

  const today = new Date();
  const closestWeekday = getClosestWeekday(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(closestWeekday);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Box>
      <h1>Choose a date</h1>
      <Box sx={{ marginBottom: 2 }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          placeholderText="Select a date"
          inline // This ensures the calendar is always displayed
          filterDate={isWeekday} // Disable weekends
          // showYearDropdown // Enable year dropdown
          // showMonthDropdown // Enable month dropdown
          dropdownMode="select" // Use select dropdown for year and month
          maxDate={today} // Disable future dates
        />
      </Box>
      <Typography
        variant='body1'
        sx={{ marginBottom: 1 }}
      >
        Check papers announced on: {selectedDate?.toDateString()}
      </Typography>
      <Button
        variant="contained"
        endIcon={<SlideshowIcon />}
        onClick={() => fetchArxivData(selectedDate)}
      >
        Go
      </Button>
    </Box >
  );
};

export default Home;