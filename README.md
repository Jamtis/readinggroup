# Readingroup management
This repo allows to manage a mailing list for a reading group via gitlab CI/CD.
The `talks.json` file contains an array of specified talks.
The idea is that the members of the reading group can add their talks to the `talks.json` files.

## Pipelines
There are two [pipelines](https://docs.gitlab.com/ee/ci/pipelines/index.html) `notify` and `remind`.
Running `notify` sends a notification for each talk (whose `shouldSendNotificationMail` returns `true`) to the mailing list (specified in `list_adress.js`).
Running `remind` sends a reminder mail to the mail adress of the presenter (specified by `presenterMailAdress`) if `shouldSendReminderMail` returns `true`

### Examples
`shouldSendNotificationMail` could return `true` if the current date is seven days before the date of the talk (specified e.g. in the `date` field in `talks.json`).
`shouldSendReminderMail` could return `true` if the current date is between one and two weeks before the date of the talk.

## Scheduled Pipelines
A [scheduled pipeline](https://docs.gitlab.com/ee/ci/pipelines/schedules.html) should be set up such that `notify` and `remind` runs periodically (e.g. daily).