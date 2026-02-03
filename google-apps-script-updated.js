// ============================================
// UPDATED Google Apps Script for Wedding RSVP
// With Email Notifications
// ============================================

// CONFIGURATION - Update these values
const SHEET_ID = '1IHFR53pBdz1JhBeMrX1YaaOSxDY5CTlC8Ug4SUQd-HU';
const COUPLE_EMAIL = 'your-email@example.com'; // <-- CHANGE THIS to your email
const COUPLE_NAMES = 'Emily & Simo';
const WEDDING_DATE = 'July 24, 2026';
const WEDDING_LOCATION = 'La Rampolina, Stresa, Italy';

// Column indices (0-based) - adjust if your sheet is different
const COL_FIRST_NAME = 0;      // Column A
const COL_LAST_NAME = 1;       // Column B
const COL_RSVP = 10;           // Column K
const COL_PLUS_ONE_FIRST = 11; // Column L
const COL_PLUS_ONE_LAST = 12;  // Column M
const DATA_START_ROW = 7;      // Row where guest data starts
const DATA_END_ROW = 129;      // Last row of guest data

function doGet(e) {
  const action = e.parameter.action;

  try {
    if (action === 'search') {
      return handleSearch(e);
    } else if (action === 'rsvp') {
      return handleRSVP(e);
    } else {
      return jsonResponse({ success: false, error: 'Invalid action' });
    }
  } catch (error) {
    return jsonResponse({ success: false, error: error.toString() });
  }
}

function handleSearch(e) {
  const firstName = (e.parameter.firstName || '').trim().toLowerCase();
  const lastName = (e.parameter.lastName || '').trim().toLowerCase();

  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const data = sheet.getRange(DATA_START_ROW, 1, DATA_END_ROW - DATA_START_ROW + 1, 13).getValues();

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const rowFirstName = (row[COL_FIRST_NAME] || '').toString().trim().toLowerCase();
    const rowLastName = (row[COL_LAST_NAME] || '').toString().trim().toLowerCase();

    if (rowFirstName === firstName && rowLastName === lastName) {
      const guest = {
        firstName: row[COL_FIRST_NAME],
        lastName: row[COL_LAST_NAME],
        rsvp: row[COL_RSVP] || null,
        rowIndex: i + DATA_START_ROW
      };

      let plusOne = null;
      const plusOneFirst = (row[COL_PLUS_ONE_FIRST] || '').toString().trim();
      const plusOneLast = (row[COL_PLUS_ONE_LAST] || '').toString().trim();

      if (plusOneFirst || plusOneLast) {
        plusOne = {
          firstName: plusOneFirst,
          lastName: plusOneLast,
          rsvp: row[COL_RSVP] || null
        };
      }

      return jsonResponse({ success: true, found: true, guest: guest, plusOne: plusOne });
    }
  }

  return jsonResponse({ success: true, found: false });
}

function handleRSVP(e) {
  const firstName = (e.parameter.firstName || '').trim().toLowerCase();
  const lastName = (e.parameter.lastName || '').trim().toLowerCase();
  const response = e.parameter.response; // 'Y' or 'N'
  const plusOneResponse = e.parameter.plusOneResponse || '';
  const guestEmail = e.parameter.email || '';

  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const data = sheet.getRange(DATA_START_ROW, 1, DATA_END_ROW - DATA_START_ROW + 1, 13).getValues();

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const rowFirstName = (row[COL_FIRST_NAME] || '').toString().trim().toLowerCase();
    const rowLastName = (row[COL_LAST_NAME] || '').toString().trim().toLowerCase();

    if (rowFirstName === firstName && rowLastName === lastName) {
      const rowNum = i + DATA_START_ROW;

      // Write guest's RSVP to their row
      sheet.getRange(rowNum, COL_RSVP + 1).setValue(response);

      // Get plus one details
      const guestName = row[COL_FIRST_NAME] + ' ' + row[COL_LAST_NAME];
      const plusOneFirst = (row[COL_PLUS_ONE_FIRST] || '').toString().trim();
      const plusOneLast = (row[COL_PLUS_ONE_LAST] || '').toString().trim();
      const plusOneName = plusOneFirst ? (plusOneFirst + ' ' + plusOneLast).trim() : null;

      // If there's a plus one response, find their row and update it
      if (plusOneResponse && plusOneFirst) {
        const plusOneFirstLower = plusOneFirst.toLowerCase();
        const plusOneLastLower = plusOneLast.toLowerCase();

        for (let j = 0; j < data.length; j++) {
          const pRow = data[j];
          const pRowFirstName = (pRow[COL_FIRST_NAME] || '').toString().trim().toLowerCase();
          const pRowLastName = (pRow[COL_LAST_NAME] || '').toString().trim().toLowerCase();

          if (pRowFirstName === plusOneFirstLower && pRowLastName === plusOneLastLower) {
            const plusOneRowNum = j + DATA_START_ROW;
            sheet.getRange(plusOneRowNum, COL_RSVP + 1).setValue(plusOneResponse);
            break;
          }
        }
      }

      // Send notification emails
      sendNotificationEmail(guestName, plusOneName, response, plusOneResponse, guestEmail);

      if (guestEmail) {
        sendGuestConfirmationEmail(guestEmail, guestName, plusOneName, response, plusOneResponse);
      }

      return jsonResponse({ success: true });
    }
  }

  return jsonResponse({ success: false, error: 'Guest not found' });
}

// Send notification to couple
function sendNotificationEmail(guestName, plusOneName, response, plusOneResponse, guestEmail) {
  const responseText = response === 'Y' ? 'Accepted' : 'Declined';
  const plusOneText = plusOneName ?
    (plusOneResponse === 'Y' ? `${plusOneName}: Accepted` : `${plusOneName}: Declined`) :
    'No plus one';

  const subject = `RSVP: ${guestName} ${response === 'Y' ? 'is coming!' : 'can\'t make it'}`;

  const body = `
New RSVP Received!

Guest: ${guestName}
Response: ${responseText}

Plus One: ${plusOneText}

Email: ${guestEmail || 'Not provided'}

Submitted: ${new Date().toLocaleString()}

---
View all responses in your Google Sheet.
  `.trim();

  try {
    MailApp.sendEmail({
      to: COUPLE_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}

// Send confirmation to guest
function sendGuestConfirmationEmail(email, guestName, plusOneName, response, plusOneResponse) {
  let subject, body;

  if (response === 'Y') {
    subject = `We can't wait to see you! - ${COUPLE_NAMES} Wedding`;

    let attendingText = `We're thrilled that you'll be celebrating with us!`;
    if (plusOneName && plusOneResponse === 'Y') {
      attendingText = `We're thrilled that you and ${plusOneName} will be celebrating with us!`;
    } else if (plusOneName && plusOneResponse === 'N') {
      attendingText = `We're thrilled that you'll be celebrating with us! We'll miss ${plusOneName}.`;
    }

    body = `
Dear ${guestName.split(' ')[0]},

${attendingText}

Save the date:
${WEDDING_DATE}
${WEDDING_LOCATION}

More details about travel and accommodations can be found on our wedding website.

If you need to update your RSVP, you can do so anytime by visiting our website.

With love,
${COUPLE_NAMES}
    `.trim();

  } else {
    subject = `We'll miss you! - ${COUPLE_NAMES} Wedding`;

    body = `
Dear ${guestName.split(' ')[0]},

We're sorry you won't be able to join us, but we completely understand and appreciate you letting us know.

You'll be in our thoughts on our special day!

If your plans change, you can always update your RSVP on our website.

With love,
${COUPLE_NAMES}
    `.trim();
  }

  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.error('Failed to send guest confirmation email:', error);
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
