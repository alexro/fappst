/* eslint-env node */

module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      options: {
        arrowParens: 'always',
        bracketSpacing: true,
        htmlWhitespaceSensitivity: 'css',
        insertPragma: false,
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
        parser: 'babel',
        printWidth: 120,
        proseWrap: 'preserve',
        requirePragma: false,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    },
    {
      files: ['*.css', '*.scss'],
      options: {
        parser: 'css',
        singleQuote: true,
        printWidth: 80,
      },
    },
    {
      files: '*.html',
      options: {
        parser: 'html',
        htmlWhitespaceSensitivity: 'css',
        printWidth: 80,
      },
    },
  ],
};
