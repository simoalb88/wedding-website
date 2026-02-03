// Google Apps Script - paste this in Extensions > Apps Script

const SHEET_ID = '1efIkAOYSqsLsFil8OR4wDKWPpYv766yiLG5woeslmVg';
const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name
const START_ROW = 7;
const END_ROW = 129;

// Column indexes (0-based)
const COL_FIRST_NAME = 0;  // A
const COL_LAST_NAME = 1;   // B
const COL_RSVP = 10;       // K
const COL_PLUS_ONE_FIRST = 11; // L
const COL_PLUS_ONE_LAST = 12;  // M

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  // Set CORS headers
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    const action = e.parameter.action;

    if (action === 'search') {
      const firstName = (e.parameter.firstName || '').trim().toLowerCase();
      const lastName = (e.parameter.lastName || '').trim().toLowerCase();
      const result = searchGuest(firstName, lastName);
      output.setContent(JSON.stringify(result));
    }
    else if (action === 'rsvp') {
      const firstName = (e.parameter.firstName || '').trim().toLowerCase();
      const lastName = (e.parameter.lastName || '').trim().toLowerCase();
      const response = e.parameter.response; // 'Y' or 'N'
      const plusOneResponse = e.parameter.plusOneResponse; // 'Y', 'N', or empty
      const result = submitRSVP(firstName, lastName, response, plusOneResponse);
      output.setContent(JSON.stringify(result));
    }
    else {
      output.setContent(JSON.stringify({ success: false, error: 'Invalid action' }));
    }
  } catch (error) {
    output.setContent(JSON.stringify({ success: false, error: error.toString() }));
  }

  return output;
}

function searchGuest(firstName, lastName) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getRange(START_ROW, 1, END_ROW - START_ROW + 1, 13).getValues();

  for (let i = 0; i < data.length; i++) {
    const rowFirstName = (data[i][COL_FIRST_NAME] || '').toString().trim().toLowerCase();
    const rowLastName = (data[i][COL_LAST_NAME] || '').toString().trim().toLowerCase();

    if (rowFirstName === firstName && rowLastName === lastName) {
      const plusOneFirst = (data[i][COL_PLUS_ONE_FIRST] || '').toString().trim();
      const plusOneLast = (data[i][COL_PLUS_ONE_LAST] || '').toString().trim();
      const currentRSVP = (data[i][COL_RSVP] || '').toString().trim();

      // Check if plus one exists and get their RSVP status
      let plusOneRSVP = '';
      if (plusOneFirst && plusOneLast) {
        plusOneRSVP = findGuestRSVP(data, plusOneFirst.toLowerCase(), plusOneLast.toLowerCase());
      }

      return {
        success: true,
        found: true,
        guest: {
          firstName: data[i][COL_FIRST_NAME],
          lastName: data[i][COL_LAST_NAME],
          rsvp: currentRSVP,
          row: i + START_ROW
        },
        plusOne: (plusOneFirst && plusOneLast) ? {
          firstName: plusOneFirst,
          lastName: plusOneLast,
          rsvp: plusOneRSVP
        } : null
      };
    }
  }

  return { success: true, found: false };
}

function findGuestRSVP(data, firstName, lastName) {
  for (let i = 0; i < data.length; i++) {
    const rowFirstName = (data[i][COL_FIRST_NAME] || '').toString().trim().toLowerCase();
    const rowLastName = (data[i][COL_LAST_NAME] || '').toString().trim().toLowerCase();

    if (rowFirstName === firstName && rowLastName === lastName) {
      return (data[i][COL_RSVP] || '').toString().trim();
    }
  }
  return '';
}

function submitRSVP(firstName, lastName, response, plusOneResponse) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getRange(START_ROW, 1, END_ROW - START_ROW + 1, 13).getValues();

  let guestRow = -1;
  let plusOneFirst = '';
  let plusOneLast = '';

  // Find the guest
  for (let i = 0; i < data.length; i++) {
    const rowFirstName = (data[i][COL_FIRST_NAME] || '').toString().trim().toLowerCase();
    const rowLastName = (data[i][COL_LAST_NAME] || '').toString().trim().toLowerCase();

    if (rowFirstName === firstName && rowLastName === lastName) {
      guestRow = i + START_ROW;
      plusOneFirst = (data[i][COL_PLUS_ONE_FIRST] || '').toString().trim().toLowerCase();
      plusOneLast = (data[i][COL_PLUS_ONE_LAST] || '').toString().trim().toLowerCase();
      break;
    }
  }

  if (guestRow === -1) {
    return { success: false, error: 'Guest not found' };
  }

  // Update guest's RSVP (Column K = column 11)
  sheet.getRange(guestRow, COL_RSVP + 1).setValue(response);

  // If there's a plus one and a response for them, update their row too
  if (plusOneFirst && plusOneLast && plusOneResponse) {
    for (let i = 0; i < data.length; i++) {
      const rowFirstName = (data[i][COL_FIRST_NAME] || '').toString().trim().toLowerCase();
      const rowLastName = (data[i][COL_LAST_NAME] || '').toString().trim().toLowerCase();

      if (rowFirstName === plusOneFirst && rowLastName === plusOneLast) {
        const plusOneRow = i + START_ROW;
        sheet.getRange(plusOneRow, COL_RSVP + 1).setValue(plusOneResponse);
        break;
      }
    }
  }

  return { success: true, message: 'RSVP recorded successfully' };
}
