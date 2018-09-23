# Attendance Extension

Attendance chrome extension for the attendance Slack bot.

## Usage

Clone repo locally and build:

- `npm i`
- `npm run build`

Then upload to chrome extensions:

- Turn on developer mode
- Updload package
- Visit `https://learn-2.galvanize.com/`, a little arrow should show at the bottome left corner. Click it to see attendance.

## Customize

- To group together the students, add a `cohort` property in the firebase database.
- To sort and display attedance number, add a `number` property in the firebase database.
