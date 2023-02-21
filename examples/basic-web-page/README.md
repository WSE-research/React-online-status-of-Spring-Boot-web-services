# Basic Web Page Example

## Navigation

- [Return to main README](../../README.md)

- [Go to typical React application example](../typical-react-application/README.md)

## Description

This example demonstrates how to integrate the plug-in into a basic web page.

You need to follow these steps:

1. Download the bundled component code and wrap it inside a `window.load` event listener to ensure React is loaded before the component is initialized.

2. Add React, ReactDOM, optionally Babel and the plug-in to your page as scripts, also link to the component's css file

3. Import the component in a script tag, initialize a React root and render the component on it

```html
<!-- load React -->
<script
  async
  crossorigin
  src="https://unpkg.com/react@18/umd/react.production.min.js"
></script>
<script
  async
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
></script>
<!-- Add babel to be able to use JSX -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Since it is a React component, React needs to be added. The example also uses Babel to allow the use of JSX, but this is not necessary. You could also replace, for instance,

```jsx
<SpringBootHealthCheck
  // a human-readable service name
  // Default is "service"
  name="My Spring Boot App"
  // The host of the spring boot application
  springBootAppUrl="http://localhost:8000"
  // The interval in milliseconds for checking the health status
  checkInterval={10000}
  // The HTML class property of the component
  className={"health-check"}
  // The type of styling preset to use
  // Default is "default" for all information with simple styling
  // "simple" for condensed information with simple styling
  // "minimal" for a coloured circle showing the status
  // "none" for no styling which is ideal for custom styles
  stylePreset="minimal"
  // The kind of health check that will be performed
  // Default is "actuator" for regular spring boot actuator health endpoints
  // "admin" is for HTTP Basic password-protected Stardog endpoints
  // "basic" is for a dumb request to the provided URL verifying the response is ok
  type={"basic"}
/>
```

with the following vanilla JavaScript:

```js
React.createElement(SpringBootHealthCheck, {
  name: "My Spring Boot App",
  springBootAppUrl: "http://localhost:8000",
  checkInterval: 10000,
  className: "health-check",
  stylePreset: "minimal",
  type: "basic",
});
```

For more details, study the files in this directory.
