/**
 * @typedef {Object} HealthStatus
 * @property {ServiceStatus} status The state of the service's health endpoint
 * @property {string} text The precise status or explanation of failure
 */
/**
 * @typedef {Object} ApplicationStatus
 * @property {ServiceStatus} actuatorStatus The state of the Spring Boot actuator endpoint
 * @property {HealthStatus} health The status of the service's health endpoint
 */
/**
 *
 * @param {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @param {number} [interval=5000] The time in milliseconds between requests checking the status of the service.
 * @param {"actuator"|"admin"|"basic"} [type="actuator"] The type of health endpoint which should be monitored
 * @param {{username:string;password:string;}} [credentials] The Basic Auth Credentials
 * @returns {ApplicationStatus}
 */
export function useApplicationStatus(type?: "actuator" | "admin" | "basic", credentials?: {
    username: string;
    password: string;
}, springBootAppUrl?: string, interval?: number): ApplicationStatus;
/**
 * Enum for states of a Spring Boot service
 */
export type SERVICE_STATUS = ServiceStatus;
/**
 * @namespace useApplicationStatus
 */
/**
 * @typedef {("offline"|"no-cors"|"problem"|"ok"|"protected")} ServiceStatus
 */
/**
 * Enum for states of a Spring Boot service
 *
 * @readonly
 * @enum {ServiceStatus}
 */
export const SERVICE_STATUS: Readonly<{
    OFFLINE: "offline";
    NO_CORS: "no-cors";
    PROBLEM: "problem";
    OK: "ok";
    PROTECTED: "protected";
}>;
export type HealthStatus = {
    /**
     * The state of the service's health endpoint
     */
    status: ServiceStatus;
    /**
     * The precise status or explanation of failure
     */
    text: string;
};
export type ApplicationStatus = {
    /**
     * The state of the Spring Boot actuator endpoint
     */
    actuatorStatus: ServiceStatus;
    /**
     * The status of the service's health endpoint
     */
    health: HealthStatus;
};
export type ServiceStatus = ("offline" | "no-cors" | "problem" | "ok" | "protected");
//# sourceMappingURL=useApplicationStatus.d.ts.map