module.exports ={
    testePathIgnorePatterns: ['/node_modules/', '/.next/'],
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
    transform: {
        '^.+\\.(jsx|ts|tsx|js)$': '<rootDir>/node_modules/babel-jest',

    },
    moduleNameMapper : {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.tsx',
        '!src/**/*.spec.tsx',
        '!src/**/_app.tsx',
        '!src/**/_document.tsx',
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
}