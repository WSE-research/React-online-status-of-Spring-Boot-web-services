import React from "react";
import ReactDOM from "react-dom/client";
import { SpringBootHealthCheck } from "@qanary/spring-boot-health-check";

const root = ReactDOM.createRoot(
  document.getElementById("springBootHealthCheckContainer")
);
root.render(
  <React.StrictMode>
    <>
      <SpringBootHealthCheck
        springBootAppUrl="http://demos.swe.htwk-leipzig.de:40111"
        checkInterval={10000}
        stylePreset="simple"
        name="My Spring Boot App"
        className="example"
        type="actuator"
      />
      <SpringBootHealthCheck
        springBootAppUrl="https://demos.swe.htwk-leipzig.de:40101"
        checkInterval={10000}
        stylePreset="none"
        name="My Spring Boot App"
        className="example"
        type="admin"
      />
      <SpringBootHealthCheck
        springBootAppUrl="http://localhost:8000/service-api/user"
        checkInterval={10000}
        stylePreset="default"
        name="My Spring Boot App"
        className="example"
        type="basic"
      />
      <SpringBootHealthCheck
        springBootAppUrl="http://localhost:8000/service-api/user"
        checkInterval={10000}
        stylePreset="minimal"
        name="My Spring Boot App"
        className="example"
        type="basic"
      />
    </>
  </React.StrictMode>
);
