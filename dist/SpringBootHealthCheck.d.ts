export default SpringBootHealthCheck;
export type SpringBootHealthCheckProps = {
    /**
     * The URL of the Spring Boot service, including port and without *any* routes.
     */
    springBootAppUrl?: string;
    /**
     * The time in milliseconds between requests checking the status of the service.
     */
    checkInterval?: number;
    /**
     * Additional class names that should be added to the health check component
     */
    className?: string;
    /**
     * Should the default styling of the component be used?
     */
    shouldUseDefaultStyling?: boolean;
    /**
     * The type of health endpoint
     */
    type?: "actuator" | "admin" | "basic";
};
/**
 * @namespace SpringBootHealthCheck
 */
/**
 * @typedef {Object} SpringBootHealthCheckProps
 * @property {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @property {number} [checkInterval=5000] The time in milliseconds between requests checking the status of the service.
 * @property {string} [className=""] Additional class names that should be added to the health check component
 * @property {boolean} [shouldUseDefaultStyling=true] Should the default styling of the component be used?
 * @property {"actuator"|"admin"|"basic"} [type="actuator"] The type of health endpoint
 */
/**
 * @name SpringBootHealthCheck
 *
 * @description A small component which checks the status of a given Spring Boot service at the specified intervals.
 *
 * @example
 * <SpringBootHealthCheck
 *  springBootAppUrl="http://localhost:8000"
 *  checkInterval={10000}
 *  shouldUseDefaultStyling={false}
 *  className="custom-styling" />
 *
 * @param {SpringBootHealthCheckProps} props
 * @returns {JSX.Element}
 */
declare function SpringBootHealthCheck({ springBootAppUrl, checkInterval, className, shouldUseDefaultStyling, type, }: SpringBootHealthCheckProps): JSX.Element;
//# sourceMappingURL=SpringBootHealthCheck.d.ts.map