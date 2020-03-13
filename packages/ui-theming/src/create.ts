import fs from 'fs';
import path from 'path';
import defaultOptions from './defaultOptions';
import Styles from './Styles';

// interface IButton {
//   fontWeight: number;
// }

interface ISize {
  height: string;
  fontSize: string;
}

interface ITypography {
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string | number;
}

interface IOptions {
  palette: Record<string, string>;
  borderRadius: string;
  typography: Record<string, ITypography>;
  // button: {
  //   small: IButton;
  //   medium: IButton;
  //   large: IButton;
  // };
  sizes: {
    small: ISize;
    medium: ISize;
    large: ISize;
  };
}


// TODO: Need to check outputPath and outputFileName args
// TODO: Need to check options required params
// TODO: Need to add options merging strategy
// TODO: Need to add tests
// TODO: Need to add possibility minify output
// TODO: Need to expand options (options for checkbox, textarea, switch, highlight code)
// TODO: Need to add README
export default function create(
  outputPath: string,
  outputFileName: string = 'default',
  options: IOptions = defaultOptions,
): void {
  const styles = new Styles();

  styles
    .addStyle('typography', options.typography, { useValueNameAsTag: true })
    .addStyle('size', options.sizes, { prefix: 'size' })
    .addColorVariables(options.palette)
    .addVariable('size-small-height', options.sizes.small.height)
    .addVariable('size-medium-height', options.sizes.medium.height)
    .addVariable('size-large-height', options.sizes.large.height)
    .addVariable('border-radius', options.borderRadius)
    .addStyleFromColorVariables('fill', 'backgroundColor')
    .addStyleFromColorVariables('stroke', 'borderColor')
    .addStyleFromColorVariables('color', 'color');

  const stylesString = [
    styles.toStringVariables(),
    styles.toStringStyles(),
  ];

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  fs.writeFileSync(
    path.join(outputPath, `${outputFileName}_theme_variables.css`),
    stylesString[0],
  );
  fs.writeFileSync(
    path.join(outputPath, `${outputFileName}_theme.css`),
    stylesString[1],
  );

  process.exit(0);
}
