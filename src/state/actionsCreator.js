export const requestActions = (moduleName, prefix) => ({
    QUEUED: `${moduleName}/${prefix}_QUEUED`,
    DEQUEUED: `${moduleName}/${prefix}_DEQUEUED`,
    REQUESTED: `${moduleName}/${prefix}_REQUESTED`,
    SUCCEEDED: `${moduleName}/${prefix}_SUCCEEDED`,
    FAILED: `${moduleName}/${prefix}_FAILED`,
});