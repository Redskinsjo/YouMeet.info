module.exports = {
  preset: "ts-jest", // Utilise ts-jest pour la transpilation TypeScript
  testEnvironment: "node", // Environnement de test pour Node.js, parfait pour les applications backend

  // Permet de gérer les imports de fichiers .graphql
  moduleNameMapper: {
    "\\.(graphql|gql)$": "identity-obj-proxy",
  },

  // Chemins de fichiers de test
  testMatch: ["<rootDir>/src/**/*.test.(ts|js)"], // Fichiers de test dans le dossier src avec extension .test.ts ou .test.js

  // Transformer pour gérer les fichiers .graphql
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transpile les fichiers .ts et .tsx avec ts-jest
    "^.+\\.(graphql|gql)$": "jest-transform-graphql", // Transpile les fichiers .graphql avec jest-transform-graphql
  },

  // Dossier où placer les rapports de couverture
  coverageDirectory: "<rootDir>/coverage",

  // Extensions de modules autorisées dans les imports
  moduleFileExtensions: ["ts", "js", "json", "node", "graphql"],

  // Exclut certains dossiers de la couverture
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
};
