const configTemplates = {
    smoke: (bv, exec) => ({
        executor: 'per-vu-iterations',
        exec,
        iterations: 1,
        vus: 1,
        gracefulStop: '2s',
    }),
    load: (bv, exec) => ({
        executor: 'constant-vus',
        exec,
        timeUnit: '1m',
        startRate: bv,
        preAllocatedVUs: 0.5 * bv,
        maxVUs: bv,
        gracefulStop: '30s',
        stages: [
            { duration: '30s', target: bv },
            { duration: '5m', target: bv },
            { duration: '30s', target: 0 },
        ],
    }),
    stress: (bv, exec) => ({
        executor: 'ramping-vus',
        exec,
        timeUnit: '1m',
        preAllocatedVUs: bv,
        maxVUs: 2 * bv,
        gracefulStop: '30s',
        stages: [
            { duration: '1m', target: 4 * bv },
            { duration: '5m', target: 4 * bv },
            { duration: '30s', target: 0 },
        ],
    }),
    spike: (bv, exec) => ({
        executor: 'ramping-vus',
        exec,
        timeUnit: '1m',
        preAllocatedVUs: bv,
        maxVUs: 2 * bv,
        gracefulStop: '10s',
        stages: [
            { duration: '1m', target: 10 * bv },
            { duration: '1m', target: 10 * bv },
            { duration: '1m', target: 0 },
        ],
    }),
};

export function buildTestConfigs(bv, exec, testType) {
    return {
        scenarios: {
            [testType]: configTemplates[testType](bv, exec),
        },

    };
}