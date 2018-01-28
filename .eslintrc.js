module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
  },
  "extends": [
    "eslint:recommended",
    "airbnb",
    "plugin:flowtype/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "flowtype",
  ],
  "settings" : {
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.js"
      }
    },
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true,
    },
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "jsx-a11y/href-no-hash": "off",
    "react/prop-types": 2,
    "no-unused-expressions": "warn",
    "no-useless-concat": "warn",
    "block-scoped-var": "error",
    "consistent-return": "off",
    "no-console": [
      "error",
      { "allow": [
        "warn", "error"
      ]
    }],
    "react/jsx-filename-extension": [
      1,
      { "extensions": [
        ".js",
        ".jsx"
      ]}
    ],
  }
};
