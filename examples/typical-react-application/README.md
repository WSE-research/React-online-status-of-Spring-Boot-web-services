# Typical React Application

## Navigation

- [Return to main README](../../README.md)

- [Go to basic web page example](../basic-web-page/README.md)

## Description

This example demonstrates how to integrate the plug-in into a typical React application which uses JSX, such as create-react-app or NextJS.

You need to follow these steps:

1. Add the component as a dependency, e. g., by running `npm i @qanary/spring-boot-health-check`

2. Use the component like any other component in your JSX.

```jsx
import { SpringBootHealthCheck } from "@qanary/spring-boot-health-check";

const Main = () => {
  return (
    <div>
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
    </div>
  );
};
```

For more details, study the files in this directory.
