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
     * The padding of the container component. It should feature the amount and a unit.
     */
    padding?: string;
    /**
     * The margin of the container component. It should feature the amount and a unit.
     */
    margin?: string;
};
/**
 * @namespace SpringBootHealthCheck
 */
/**
 * @typedef {Object} SpringBootHealthCheckProps
 * @property {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @property {number} [checkInterval=5000] The time in milliseconds between requests checking the status of the service.
 * @property {string} [padding="0.5rem"] The padding of the container component. It should feature the amount and a unit.
 * @property {string} [margin="0.5rem"] The margin of the container component. It should feature the amount and a unit.
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
 *  padding="1rem"
 *  margin="0.2rem" />
 *
 * @param {SpringBootHealthCheckProps} props
 * @returns {JSX.Element}
 */
declare function SpringBootHealthCheck({ springBootAppUrl, checkInterval, padding, margin, }: SpringBootHealthCheckProps): JSX.Element;
//# sourceMappingURL=SpringBootHealthCheck.d.ts.map