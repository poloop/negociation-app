module.exports = {
  'check-coverage': false,
  all: true,
  include: ['src/**/*.{vue,js}'],
  exclude: ['src/main.js', 'src/plugins/*'],
  reporter: ['lcov', 'text', 'text-summary'],
  'report-dir': './tests/coverage',
  extension: ['.vue', '.js']
};
