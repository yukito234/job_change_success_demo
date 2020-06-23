module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // より厳しいルールにするには`plugin:vue/strongly-recommended` もしくは `plugin:vue/recommended` に切り替えることを検討してください。
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: [
    'vue'
  ],
  // ここにカスタムルールを追加します。
  rules: {
    //htmlのインデントをtabで行う
    'vue/html-indent': ['error', 'tab', {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],
    'vue/no-unused-components': 'off',//BIconでのエラー回避
    'no-console': 'off',
    "vue/attribute-hyphenation": ["error", "always", {//b-tableの属性でのエラー回避
      "ignore": ['filterIncludedFields']
    }],
    "vue/html-self-closing": ["error", { //<br />でのエラー回避
      "html": {
        "void": "always",
      }
    }],
    'vue/max-attributes-per-line': 'off',//１行あたり属性値の最大数を制限するルール
  }
}