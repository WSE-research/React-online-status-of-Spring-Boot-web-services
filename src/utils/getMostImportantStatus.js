/**
 * @type {{[key in import("../hooks/useApplicationStatus").ServiceStatus]: number}}
 */
const statusComparisonTable = {
  ok: 0,
  "no-cors": 1,
  offline: 2,
  problem: 3,
  protected: 4,
};

/**
 * @template Key
 * @template Value
 *
 * @param {{[key in Key]: Value}} table
 * @returns {{[key in Value]: Key}}
 */
const inverseOfTable = (table) =>
  Object.fromEntries(Object.entries(table).map(([key, value]) => [value, key]));

const inverseOfStatusComparisonTable = inverseOfTable(statusComparisonTable);

/**
 *
 * @param  {...import("../hooks/useApplicationStatus").ServiceStatus} statuses
 * @returns
 */
export const getMostImportantStatus = (...statuses) =>
  inverseOfStatusComparisonTable[
    statuses.reduce(
      (currentlyMostImportantStatus, nextStatus) =>
        Math.max(
          currentlyMostImportantStatus,
          statusComparisonTable[nextStatus]
        ),
      -1
    )
  ];
