# react-online-status-of-spring-boot-web-services

A straightforward plugin for checking the status of a Spring Boot service.

For more detailed descriptions of everything, see the automatically generated [documentation](docs/docs.md).

Example Usage:

```jsx
<SpringBootHealthCheck
  springBootAppUrl="http://localhost:8000"
  checkInterval={10000}
  padding="1rem"
  margin="0.2rem" />
```

Example for overwriting the colours:

```css
:root {
  --ok-color: rgb(122, 123, 0) !important;
  --problem-color: blue !important;
  --offline-color: rgb(11, 11, 11) !important;
}
```