module.exports ={
    testeIgnorePatterns: ['/node_modules/', '/.next/'],
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
    transform: {
        '^.+\\.(jsx|ts|tsx|js)$': '<rootDir>/node_modules/babel-jest',

    },
    testeEnviroment: 'jsdom',
}