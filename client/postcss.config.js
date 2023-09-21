module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // Options
        stage: 0,
        features: {
          'nesting-rules': {
            noIsPseudoSelector: false,
          },
        },
      },
    ],
  ],
};
