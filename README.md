# Dynamic Form

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Challenge details

### Goal
Create a dynamic form using a frontend framework and TypeScript. Render it based on a provided configuration array and capture user input.

### Requirements
- Use hooks or equivalent, and a state management tool.
- Configurations specify type (e.g., "text", "number", "select"), label, and options (for select types).
- Include a submit button. On submission, display the captured data.
- Ensure a mobile-first, responsive design.
- Employ TypeScript for type definitions and checks

## Notes

### Before the meeting

The project was ready to be used, allowing to use the form providing
an object with the fields configuration. I was applying a basic
validation to numbers and strings and disabling/enabling
submit button depending on the individual validation of each field.

I also highlighted errors on fields, giving dark red borders and
text colors for error state.

### After the meeting

- Updates were introduced to show the submitted data in the screen,
show the field rules in the field label (min, max, etc).
- Better validation for text was added (checking min and max length).
- Responsive design was improved in order for the form to display nicely
in smaller viewports.
- Added fully support for text area, date (with date validation).

### Extras

- Linter and prettifier are set up on the project, with basic rules
- There is some basic test for the Form Demo screen component

## How to run the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Alternatively, for a production-ready build:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

