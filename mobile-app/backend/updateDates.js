const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const institutionsPath = path.join(
  __dirname,
  "../data/institutionData.js"
);

const bursariesPath = path.join(
  __dirname,
  "../data/bursaryData.js"
);

function extractDates(text) {
  const patterns = [
    /applications?\s+open(?:ing)?\s*(?:on)?\s*(\d{1,2}\s+\w+\s+\d{4})/gi,

    /applications?\s+close(?:s|d)?\s*(?:on)?\s*(\d{1,2}\s+\w+\s+\d{4})/gi,

    /opening\s+date\s*[:\-]?\s*(\d{1,2}\s+\w+\s+\d{4})/gi,

    /closing\s+date\s*[:\-]?\s*(\d{1,2}\s+\w+\s+\d{4})/gi,

    /(\d{1,2}\s+\w+\s+\d{4})\s*-\s*(\d{1,2}\s+\w+\s+\d{4})/gi,
  ];

  let openDate = null;
  let closeDate = null;

  patterns.forEach((regex) => {
    let match;

    while ((match = regex.exec(text)) !== null) {
      const value = match[1];

      if (
        regex.source.includes("open") ||
        regex.source.includes("opening")
      ) {
        openDate = value;
      }

      if (
        regex.source.includes("close") ||
        regex.source.includes("closing")
      ) {
        closeDate = value;
      }
    }
  });

  return {
    openDate,
    closeDate,
  };
}

async function scrapePage(url) {
  try {
    console.log("Scraping:", url);

    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const $ = cheerio.load(data);

    const text = $("body").text();

    return extractDates(text);
  } catch (err) {
    console.log("Failed:", url);
    return {};
  }
}

async function updateInstitutions() {
  const institutions = require(institutionsPath);

  for (const institution of institutions) {
    const result = await scrapePage(
      institution.applyLink || institution.website
    );

    if (result.openDate)
      institution.opensAt = result.openDate;

    if (result.closeDate)
      institution.closesAt = result.closeDate;
  }

  const output =
    "export const institutionData = " +
    JSON.stringify(institutions, null, 2);

  fs.writeFileSync(institutionsPath, output);

  console.log("Institutions updated");
}

async function updateBursaries() {
  const bursaries = require(bursariesPath);

  for (const bursary of bursaries) {
    const result = await scrapePage(
      bursary.link || bursary.website
    );

    if (result.openDate)
      bursary.openingDate = result.openDate;

    if (result.closeDate)
      bursary.closingDate = result.closeDate;
  }

  const output =
    "export const bursaryData = " +
    JSON.stringify(bursaries, null, 2);

  fs.writeFileSync(bursariesPath, output);

  console.log("Bursaries updated");
}

async function run() {
  await updateInstitutions();
  await updateBursaries();

  console.log("Finished");
}

run();