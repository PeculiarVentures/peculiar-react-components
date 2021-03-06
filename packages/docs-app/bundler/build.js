// Do this as the first thing so that any code reading it knows the right env.
if (!process.env.NODE_ENV) {
  process.env.BABEL_ENV = 'production';
  process.env.NODE_ENV = 'production';
}

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Create the production build and print the deployment instructions.
function build(config, previousFileSizes) {
  console.log('Creating an optimized production build...');

  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      const messages = formatWebpackMessages(
        stats.toJson({ all: false, warnings: true, errors: true }),
      );

      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }

        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI
        && (
          typeof process.env.CI !== 'string'
          || process.env.CI.toLowerCase() !== 'false'
        )
        && messages.warnings.length
      ) {
        console.log(
          chalk.yellow('\nTreating warnings as errors because process.env.CI = true. Most CI servers set it automatically.\n'),
        );

        return reject(new Error(messages.warnings.join('\n\n')));
      }

      const resolveArgs = {
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      };

      return resolve(resolveArgs);
    });
  });
}

let sequence = Promise.resolve();

sequence
  // Read the current file sizes in build directory.
  // This lets us display how much they changed later.
  .then(() => measureFileSizesBeforeBuild(path.resolve(__dirname, '../dist')))
  .then((previousFileSizes) => {
    const entryFolderPath = path.resolve(__dirname, '../src');

    if (!fs.existsSync(entryFolderPath)) {
      throw Error(`Entry folder "${entryFolderPath}" was not found. Please check your "ENTRY_FOLDER" env varialbe.\n`);
    }

    return previousFileSizes;
  })
  .then((previousFileSizes) => {
    const config = require(process.env.WEBPACK_CONFIG || './config/prod.config'); // eslint-disable-line

    return build(config, previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(`\nSearch for the ${chalk.underline(chalk.yellow('keywords'))} to learn more about each warning.`);
        console.log(`To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.\n`);
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        path.resolve(__dirname, '../dist'),
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
      );
      console.log();
    },
    (err) => {
      console.log(chalk.red('Failed to compile.\n'));
      printBuildError(err);

      process.exit(1);
    },
  )
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }

    process.exit(1);
  });
