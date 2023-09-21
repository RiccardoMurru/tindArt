module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 0,
      features: {
        'nesting-rules': {
          noIsPseudoSelector: false,
        },
      },
    }),
  ],
};
