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
    
    'vue/html-indent': ['error', 'tab', {
      "attribute": 1,
      "baseIndent": 1,
      "closeBracket": 0,
      "alignAttributesVertically": true,
      "ignores": []
    }],//htmlのインデントをtabで行う
    
    //'semi': [2, 'never'],
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
    /*
    'vue/max-attributes-per-line': [
      "error",
      {
        "singleline": 1,
        "multiline": {
          "max": 1,
          "allowFirstLine": false
        }
      }
    ],
    */


    //prettierの設定は.prettierrcに記述する
    /*
    'prettier/prettier': ['error', 
      { 
        //"tabWidth": 4,  // 1 インデントあたりの空白数
        //"useTabs": true,  // インデントにタブを使用する
        //"endOfLine":"auto",　
        //"singleQuote": true, // 引用符としてシングルクオートを使用する
        //"semi": true, // 式の最後にセミコロンを付加する (true)
        //"bracketSpacing": false, //オブジェクトリテラルの大括弧の間にスペースを入れるかどうか
        //"proseWrap": "preserve",
        //"arrowParens": "avoid", //function の()を省略するかどうか. "avoid" – 可能であれば省略する。例：x => x
      }
    ]
    */
    

  }
}