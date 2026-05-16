const { parseISO } = require('date-fns');
import { toZonedTime } from 'date-fns-tz';

// Function to convert a date string to a Date object in EDT
function getEDTDate(dateString: string) {
  const date = parseISO(dateString);
  const timeZone = 'Etc/UTC'; // Time zone for EDT
  const zonedDate = toZonedTime(date, timeZone); // Convert to EDT
  return zonedDate;
}

export const getClosestWeekday = (date: Date) => {
  const day = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  // If today is Saturday, return the previous Friday (subtract 1 day)
  if (day === 6) {
    date.setDate(date.getDate() - 1);
  }

  // If today is Sunday, return the previous Friday (subtract 2 days)
  if (day === 0) {
    date.setDate(date.getDate() - 2);
  }

  // For weekdays (Monday to Friday), return the same date
  return date;
};

const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

function isPublishedBefore(publishedDateStamp: string | null, comparisonDate: Date) {
  if (publishedDateStamp === null) {
    return false;
  } else {
    const publishedDate = getEDTDate(publishedDateStamp);
    console.log(publishedDateStamp);
    console.log(publishedDate);
    return publishedDate < comparisonDate;
  }
}

const parseArxivData = (data: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, 'application/xml');
  return xmlDoc;
}

function extractPaperInfo(xmlDoc: Document, date1: Date, date2: Date) {
  const entries = xmlDoc.getElementsByTagName('entry');
  const papers = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const title = entry.getElementsByTagName('title')[0].textContent;
    const summary = entry.getElementsByTagName('summary')[0].textContent;
    const authors = Array.from(entry.getElementsByTagName('author')).map(author => author.getElementsByTagName('name')[0].textContent);
    const published = entry.getElementsByTagName('published')[0].textContent;
    const updated = entry.getElementsByTagName('updated')[0].textContent;
    const id = entry.getElementsByTagName('id')[0].textContent;
    const link = entry.getElementsByTagName('link')[0].getAttribute('href');

    if (!isPublishedBefore(published, date1) && isPublishedBefore(published, date2)) {
      papers.push({
        title,
        summary,
        authors,
        published,
        updated,
        id,
        link
      });
    } else {
      console.log({
        title,
        summary,
        authors,
        published,
        updated,
        id,
        link
      });
    }
  }

  return papers;
}

export const fetchArxivData = async (date: Date | null) => {

  if (date === null) {
    return;
  }

  // Calculate the day before
  const yesterday = new Date();
  yesterday.setDate(date.getDate() - 1);
  const weekday = getClosestWeekday(yesterday);
  const date2 = new Date();
  date2.setDate(weekday.getDate() + 1);
  date2.setHours(18, 0, 0, 0);
  const formattedDate2 = getFormattedDate(date2);

  // Calculate the day before yesterday
  const date1 = new Date();
  date1.setDate(date2.getDate() - 2);
  date1.setHours(18, 0, 0, 0);
  const formattedDate1 = getFormattedDate(getClosestWeekday(date1));

  const url = `https://export.arxiv.org/api/query?search_query=cat:hep-ph+AND+submittedDate:[${formattedDate1}+TO+${formattedDate2}]&start=0&max_results=100`;
  const response = await fetch(url);
  const data = await response.text();
  const xmlDoc = parseArxivData(data);
  const papers = extractPaperInfo(xmlDoc, date1, date2);
  console.log(papers);
  return papers;
};
