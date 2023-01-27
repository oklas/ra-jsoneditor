module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper : {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  transform: {
    "node_modules/jsoneditor-react/es/.+\\.(j|t)sx?$": "babel-jest",
    "node_modules/jsoneditor/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!jsoneditor-react/es/.*)",
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'coverage/junit/',
        outputName: 'jest-junit.xml',
        classNameTemplate: '{classname} › {title}',
        titleTemplate: '{classname} › {title}',
        suiteName: '{filepath}',
        addFileAttribute: 'true',
        ancestorSeparator: ' › ',
        usePathForSuiteName: 'true',
      },
    ],
  ],
};