import fs from 'fs';
import path from 'path';
import sass from 'sass';
import sassFunctions from './sassFunctions';
import defaultOptions from './defaultOptions';

interface IOptions {
  inputDir: string;
  outputDir: string;
  outputStyle?: 'compressed' | 'expanded';
}

export default function create(options: IOptions): void {
  let compileTime = 0;

  console.log('Status: starting');
  console.log();

  /**
   * Create css/ directory for output styles
   */
  if (!fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir);
  }

  /**
   * Read .sass files from styles/ directory
   */
  const files = fs.readdirSync(options.inputDir);

  /**
   * Compile and move styles to css/ directory
   */
  files.forEach((file) => {
    const isSuppotedFile = /\.sass$/.test(file);

    if (!isSuppotedFile) {
      return;
    }

    const result = sass.renderSync({
      file: path.join(options.inputDir, file),
      functions: sassFunctions({ palette: defaultOptions.palette }),
      outputStyle: options.outputStyle,
    });

    compileTime += result.stats.duration;

    fs.writeFileSync(
      path.join(options.outputDir, `${file.replace(/\.sass$/, '.css')}`),
      result.css,
    );
  });

  console.log('Status: finished');
  console.log(`Output path: ${options.outputDir}`);
  console.log(`Duration: ${compileTime} milliseconds`);
  console.log();
}
