import * as React from 'react';
import * as PopperJS from 'popper.js';

type Color = 'primary'
  | 'secondary'
  | 'black'
  | 'dark_grey'
  | 'grey'
  | 'light_grey'
  | 'grey_4'
  | 'success'
  | 'wrong'
  | 'white'
  | string;
type Fill = 'fill' | 'stroke';
type TypographyType = 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'c1'
  | string;
type ValidationType = 'password'
  | 'name'
  | 'fullName'
  | 'email'
  | 'phone'
  | 'number'
  | 'text'
  | 'letters'
  | 'date'
  | 'cert'
  | 'hex'
  | 'base64'
  | 'objectID'
  | 'url';
type PlacementType = 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';
type CodeType = 'css'
  | 'html'
  | 'javascript'
  | 'js'
  | 'jsx'
  | 'markup'
  | 'svg'
  | 'xml'
  | 'bash'
  | 'glsl'
  | 'none'
  | 'json';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  letters?: string;
  size?: number;
  src?: string;
  defaultSrc?: string;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  ref?: React.Ref<HTMLElement>;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgType?: Fill | 'clear';
  color?: Color;
  align?: 'left' | 'center' | 'right';
  textColor?: Color;
  size?: 'small' | 'medium' | 'large';
  href?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
  gaEventName?: string;
  component?: (props: any) => JSX.Element;
  full?: boolean;
}

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  tagType?: keyof React.ReactHTML;
  fill?: Color;
  fillOpacity?: number;
  stroke?: Color;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  strokeType?: 'horizontal' | 'vertical' | 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  bgType?: ButtonProps['bgType'];
  color?: ButtonProps['color'];
  textColor?: ButtonProps['textColor'];
  size?: ButtonProps['size'];
  disabled?: boolean;
  children: React.ReactNode;
  full?: boolean;
}

interface ButtonSplitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  bgType?: ButtonProps['bgType'];
  color?: ButtonProps['color'];
  textColor?: ButtonProps['textColor'];
  size?: ButtonProps['size'];
  disabled?: boolean;
  full?: boolean;
  className?: string;
  overlay?: boolean;
  actions: {
    text: string;
    href?: string;
    target?: string;
    disabled?: boolean;
    onClick?: (e: Event) => void;
    type?: TypographyBasicProps['type'];
    tabletType?: TypographyBasicProps['tabletType'];
    mobileType?: TypographyBasicProps['mobileType'];
    color?: TypographyBasicProps['color'];
    align?: TypographyBasicProps['align'];
    className?: string;
  }[];
}

interface CheckboxProps extends SwitchHandler {
  iconType?: 'checkmark' | 'square';
}

interface ContentLoaderProps extends React.SVGAttributes<SVGAElement> {
  color?: Color;
  duration?: number;
  height?: number;
  width?: number;
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

interface HighlightCodeProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
  lang?: CodeType;
  ref?: React.Ref<HTMLElement>;
}

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color;
  colorProgress?: Color;
  size?: number;
  thickness?: number;
  ref?: React.Ref<HTMLElement>;
}

interface CounterProps {
  value?: number;
  defaultValue?: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
  minValuePlaceholder?: number | string;
  maxValuePlaceholder?: number | string;
  disabled?: boolean;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  colorFocus?: Color;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  counterProps?: React.InputHTMLAttributes<HTMLDivElement>;
  gaEventName?: string;
}

interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: Color;
  colorProgress?: Color;
  value?: number;
  ref?: React.Ref<HTMLElement>;
}

interface ProgressiveImageProps {
  children: React.ReactNode;
  onError?: (error: Error) => void;
  placeholder?: string;
  src?: string;
  ref?: React.Ref<HTMLElement>;
}

interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (e: Event, value: boolean) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  label?: string | number;
  labelPosition?: 'left' | 'right';
  labelProps?: TypographyBasicProps;
  className?: string;
  tabIndex?: number;
  bgType?: Fill;
  color?: Color;
  colorOn?: Color;
  iconColor?: Color;
  iconColorOn?: Color;
  ref?: React.Ref<HTMLElement>;
  gaEventName?: string;
}

interface RadioGroupProps {
  children: React.ReactNode;
  name: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: Event, value: string) => void;
  className?: string;
  ref?: React.Ref<HTMLElement>;
  gaEventName?: string;
}

interface SelectProps {
  children: React.ReactNode;
  native?: boolean;
  name?: string;
  disabled?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: Event, value: string | number, name: string) => void;
  onFocus?: (e: Event, name: string) => void;
  onBlur?: (e: Event, name: string) => void;
  onKeyDown?: (e: Event, name: string) => void;
  tabIndex?: number;
  className?: string;
  placeholder?: string | number;
  placeholderColor?: Color;
  inputProps?: object;
  arrowComponent?: React.ReactNode;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  colorFocus?: Color;
  size?: 'medium' | 'large';
  mobileSize?: 'medium' | 'large';
  placement?: 'top' | 'bottom';
  ref?: React.Ref<HTMLElement>;
  gaEventName?: string;
}

interface SelectDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  bgType?: Fill;
  color?: Color;
  colorFocus?: Color;
  ref?: React.Ref<HTMLElement>;
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  hasFocus?: boolean;
  textColor?: Color;
  colorFocus?: Color;
  size?: 'medium' | 'large';
  ref?: React.Ref<HTMLElement>;
}

interface SliderProps {
  defaultValue?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  name?: string;
  onChange?: (e: Event, value: number) => void;
  onDragStart?: (e: Event) => void;
  onDragStop?: (e: Event) => void;
  onMouseDown?: (e: Event) => void;
  onTouchStart?: (e: Event) => void;
  required?: boolean;
  step?: number;
  value?: number;
  className?: string;
  tabIndex?: number;
  color?: Color;
  iconColor?: Color;
  progressColor?: Color;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  ref?: React.Ref<HTMLElement>;
  gaEventName?: string;
}

interface SnackbarProps {
  autoHideDuration?: number;
  children: React.ReactNode;
  className?: string;
  onClose?: (value: null, action: string) => void;
  onMouseLeave?: (e: Event) => void;
  onMouseEnter?: (e: Event) => void;
  open?: boolean;
  fullWidth?: boolean;
  verticalPosition?: 'top' | 'bottom';
  horizontalPosition?: 'left' | 'center' | 'right';
  action?: React.ReactNode;
  color?: Color;
  textColor?: Color;
  ref?: React.Ref<HTMLElement>;
}

interface SwitchHandler extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheck?: (e: Event, checked: boolean) => void;
  checked?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
  tabIndex?: number;
  bgType?: Fill;
  color?: Color;
  colorOn?: Color;
  iconColor?: Color;
  iconColorOn?: Color;
  ref?: React.Ref<HTMLElement>;
  label?: string | number;
  labelPosition?: 'left' | 'right';
  labelProps?: TypographyBasicProps;
  gaEventName?: string;
}

interface SwitchProps extends SwitchHandler {}

interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  className?: string;
  disabled?: boolean;
  value: string | number;
  children: React.ReactNode;
  selected?: boolean;
  tabIndex?: number;
  color?: Color;
  colorOn?: Color;
  ref?: React.Ref<HTMLElement>;
  gaEventName?: string;
  component?: (props: any) => JSX.Element;
  onClick?: (e: Event, value: string | number) => void;
}

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (e: Event, value: string | number) => void;
  color?: Color;
  colorOn?: Color;
  align?: 'left' | 'center' | 'right';
  className?: string;
  ref?: React.Ref<HTMLElement>;
  gaEventName?: string;
}

interface InpuBasicProps {
  tabIndex?: number;
  className?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  multiLine?: boolean;
  type?: string;
  value?: string | number;
  required?: boolean;
  valid?: boolean;
  placeholder?: string;
  placeholderColor?: Color;
  children?: React.ReactNode;
  name?: string;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  colorFocus?: Color;
  size?: 'medium' | 'large';
  mobileSize?: 'medium' | 'large';
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  autoComplete?: string;
  autoFocus?: boolean;
  ref?: React.Ref<HTMLElement>;
}

interface InputProps extends InpuBasicProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface TextFieldProps extends InpuBasicProps {
  onChange?: (e: Event, valid: boolean) => void;
  onBlur?: (e: Event) => void;
  onChangeType?: (type: string) => void;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
  type?: 'text'
    | 'password'
    | 'email'
    | 'tel'
    | 'date';
  validation?: (ValidationType|((value: string | number) => boolean))[];
}

interface AutocompleteProps {
  tabIndex?: number;
  className?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  value?: string | number;
  required?: boolean;
  valid?: boolean;
  placeholder?: string;
  placeholderColor?: Color;
  children?: React.ReactNode;
  name?: string;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  colorFocus?: Color;
  size?: 'medium' | 'large';
  mobileSize?: 'medium' | 'large';
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  autoComplete?: string;
  ref?: React.Ref<HTMLElement>;
  onChange?: (e: Event, value: string | number, name: string, action: 'select' | undefined) => void;
  onFocus?: (e: Event, name: string) => void;
  onBlur?: (e: Event, name: string) => void;
  onKeyDown?: (e: Event, name: string) => void;
  type?: 'text'
    | 'password'
    | 'email'
    | 'tel'
    | 'date';
  validation?: (ValidationType|((value: string | number) => boolean))[];
}

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement>, Omit<TooltipPopperProps, 'referenceElement' | 'children' | 'open'> {
  children: React.ReactNode;
  content: React.ReactNode;
  action?: 'click' | 'hover' | 'focus' | 'none';
  component?: string;
  ref?: React.Ref<HTMLElement>;
  open?: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
  overlay?: boolean;
  overlayColor?: Color;
  overlayOpacity?: number;
  overlayZIndex?: number;
  overlayProps?: React.HTMLAttributes<HTMLDivElement>;
}

interface TooltipPopperProps {
  open: boolean;
  children: React.ReactNode;
  arrow?: boolean;
  placement?: PlacementType;
  positionFixed?: boolean;
  offset?: number;
  referenceElement?: HTMLElement;
  color?: Color;
  zIndex?: number;
  usePortal?: boolean | HTMLElement;
  preventOverflow?: boolean,
  preventFlip?: boolean,
  classNameTooltip?: string;
  classNameTooltipContent?: string;
  showDelay?: number;
  flipBoundaryElement?: PopperJS.Boundary | Element;
}

interface TypographyBasicProps extends React.HTMLAttributes<HTMLElement> {
  type?: TypographyType;
  tabletType?: TypographyType;
  mobileType?: TypographyType;
  color?: Color;
  align?: 'left' | 'center' | 'right' | 'auto';
  className?: string;
}

interface TypographyProps extends TypographyBasicProps {
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

interface CheckmarkIconProps extends React.SVGAttributes<SVGAElement> {}
interface EyeInvisibleIconProps extends React.SVGAttributes<SVGAElement> {}
interface EyeVisibleIconProps extends React.SVGAttributes<SVGAElement> {}
interface RequiredIconProps extends React.SVGAttributes<SVGAElement> {}
interface SelectArrowIconProps extends React.SVGAttributes<SVGAElement> {}

interface DeviceProviderProps {
  children: React.ReactNode;
  rootElement?: HTMLElement;
}

interface OfflineProviderProps {
  children: React.ReactNode;
}

interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
  onRendered?: () => void;
}

interface SegueHandlerProps {
  children: React.ReactNode;
  value?: string | number;
  defaultValue?: string | number;
}

interface AnalyticsProviderProps {
  children: React.ReactNode;
  onEvent: (eventName: string) => void
}

interface WindowSize {
  width: number;
  height: number;
}

interface DeviceInfo extends WindowSize {
  type: 'desktop' | 'tablet' | 'mobile';
  orientation: 'landscape' | 'portrait';
}

interface RegExps {
  password: RegExp;
  fullName: RegExp;
  email: RegExp;
  phone: RegExp;
  number: RegExp;
  text: RegExp;
  letters: RegExp;
  date: RegExp;
  hex: RegExp;
  cert: RegExp;
  base64: RegExp;
  objectID: RegExp;
}

declare const Avatar: React.ComponentType<AvatarProps>;
declare const Autocomplete: React.ComponentType<AutocompleteProps>;
declare const Box: React.ComponentType<BoxProps>;
declare const Button: React.ComponentType<ButtonProps>;
declare const ButtonGroup: React.ComponentType<ButtonGroupProps>;
declare const ButtonSplit: React.ComponentType<ButtonSplitProps>;
declare const Checkbox: React.ComponentType<CheckboxProps>;
declare const ContentLoader: React.ComponentType<ContentLoaderProps>;
declare const HighlightCode: React.ComponentType<HighlightCodeProps>;
declare const CircularProgress: React.ComponentType<CircularProgressProps>;
declare const Counter: React.ComponentType<CounterProps>;
declare const LinearProgress: React.ComponentType<LinearProgressProps>;
declare const ProgressiveImage: React.ComponentType<ProgressiveImageProps>;
declare const Radio: React.ComponentType<RadioProps>;
declare const RadioGroup: React.ComponentType<RadioGroupProps>;
declare const Select: React.ComponentType<SelectProps>;
declare const SelectDropdown: React.ComponentType<SelectDropdownProps>;
declare const SelectItem: React.ComponentType<SelectItemProps>;
declare const Slider: React.ComponentType<SliderProps>;
declare const Snackbar: React.ComponentType<SnackbarProps>;
declare const Switch: React.ComponentType<SwitchProps>;
declare const Tab: React.ComponentType<TabProps>;
declare const Tabs: React.ComponentType<TabsProps>;
declare const Input: React.ComponentType<InputProps>;
declare const TextField: React.ComponentType<TextFieldProps>;
declare const Tooltip: React.ComponentType<TooltipProps>;
declare const TooltipPopper: React.ComponentType<TooltipPopperProps>;
declare const Typography: React.ComponentType<TypographyProps>;

declare const CheckmarkIcon: React.ComponentType<CheckmarkIconProps>;
declare const EyeInvisibleIcon: React.ComponentType<EyeInvisibleIconProps>;
declare const EyeVisibleIcon: React.ComponentType<EyeVisibleIconProps>;
declare const RequiredIcon: React.ComponentType<RequiredIconProps>;
declare const SelectArrowIcon: React.ComponentType<SelectArrowIconProps>;

declare const DeviceProvider: React.ComponentType<DeviceProviderProps>;
declare const OfflineProvider: React.ComponentType<OfflineProviderProps>;
declare const Portal: React.ComponentType<PortalProps>;
declare const SegueHandler: React.ComponentType<SegueHandlerProps>;
declare const AnalyticsProvider: React.ComponentType<AnalyticsProviderProps>;

declare function getWindowSize(): WindowSize;
declare function withAnalytics<T>(component: React.ComponentType<T>, trigger?: keyof T): React.ComponentType<T & { gaEventName?: string }>;
declare function getDeviceInfo(rootElement?: HTMLElement): DeviceInfo;
declare function uuid(): string;
declare const regExps: RegExps;
declare function validator(
  value: string | number,
  types: (ValidationType|((value: string | number) => boolean))[],
  ignoreStartAndEndSpaces?: boolean,
): boolean;