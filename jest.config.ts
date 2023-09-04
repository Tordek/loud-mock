/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: { "\\.[jt]s?$": ["ts-jest", { tsconfig: { allowJs: true } }] }, // allowJs is required for get-port
  transformIgnorePatterns: [
    "//node_modules",
  ],
  moduleFileExtensions: ["ts", "js"],
};
