import React from "react";
import ReactDOM from "react-dom/client";
import { SpringBootHealthCheck } from "@qanary/spring-boot-health-check";

const root = ReactDOM.createRoot(
  document.getElementById("springBootHealthCheckContainer")
);
root.render(
  <React.StrictMode>
    <SpringBootHealthCheck
      springBootAppUrl="http://localhost:8000"
      checkInterval={10000}
      stylePreset="minimal"
      name="My Spring Boot App"
      className="example"
      type="admin"
    />
  </React.StrictMode>
);
