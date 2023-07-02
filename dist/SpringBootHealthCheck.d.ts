export default SpringBootHealthCheck;
export type Deprecated = "DEPRECATED";
export type SpringBootHealthCheckProps = {
    /**
     * The human-readable name that can be used to distinguish multiple components
     */
    name?: string;
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
     * The type of styling preset to use
     */
    stylePreset?: "default" | "simple" | "minimal" | "none";
    shouldUseDefaultStyling?: Deprecated;
    /**
     * The type of health endpoint
     */
    type?: "actuator" | "admin" | "basic";
};
/**
 * @namespace SpringBootHealthCheck
 * @typedef {"DEPRECATED"} Deprecated
 */
/**
 * @typedef {Object} SpringBootHealthCheckProps
 * @property {string} [name="service"] The human-readable name that can be used to distinguish multiple components
 * @property {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @property {number} [checkInterval=5000] The time in milliseconds between requests checking the status of the service.
 * @property {string} [className=""] Additional class names that should be added to the health check component
 * @property {"default"|"simple"|"minimal"|"none"} [stylePreset="default"] The type of styling preset to use
 * @property {Deprecated} [shouldUseDefaultStyling="DEPRECATED"]
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
 *  name="my service"
 *  stylePreset="minimal"
 *  className="custom-styling" />
 *
 * @param {SpringBootHealthCheckProps} props
 * @returns {JSX.Element}
 */
declare function SpringBootHealthCheck({ name, springBootAppUrl, checkInterval, className, stylePreset, type, shouldUseDefaultStyling, }: SpringBootHealthCheckProps): JSX.Element;
//# sourceMappingURL=SpringBootHealthCheck.d.ts.map