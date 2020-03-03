module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          silent: true,
          useCache: true,
          forceIsolatedModules: true,
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          propFilter: (propInfo) => {
            if (propInfo.parent && propInfo.parent.fileName.indexOf('node_modules') !== -1) {
              return false;
            }

            return true;
          },
        }
      },
    ],
  });

  config.module.rules.push({
    test: /\.story\.(ts|tsx)$/,
    loaders: [{
      loader: require.resolve('@storybook/addon-storysource/loader'),
      options: { parser: 'typescript' }
    }],
    enforce: 'pre',
  });

  config.optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 30000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  };

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
