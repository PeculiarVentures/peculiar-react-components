import * as React from 'react';

type Color = 'primary'
  | 'secondary'
  | 'black'
  | 'dark_grey'
  | 'grey'
  | 'light_grey'
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
  | 'none';

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
  bgType?: Fill;
  color?: Color;
  align?: 'left' | 'center' | 'right';
  textColor?: Color;
  size?: 'small' | 'medium' | 'large';
  href?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
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
  minValueLabel?: number | string;
  maxValueLabel?: number | string;
  disabled?: boolean;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  colorFocus?: Color;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  counterProps?: React.InputHTMLAttributes<HTMLDivElement>;
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
  labelPosition?: 'left' | 'right';
  className?: string;
  tabIndex?: number;
  bgType?: Fill;
  color?: Color;
  colorOn?: Color;
  iconColor?: Color;
  iconColorOn?: Color;
  ref?: React.Ref<HTMLElement>;
}

interface RadioGroupProps {
  children: React.ReactNode;
  name: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: Event, value: string) => void;
  className?: string;
  ref?: React.Ref<HTMLElement>;
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
  inputProps?: object;
  arrowComponent?: React.ReactNode;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  colorFocus?: Color;
  size?: 'medium' | 'large';
  placement?: 'top' | 'bottom';
  ref?: React.Ref<HTMLElement>;
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

interface SwitchHandler {
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
}

interface SwitchProps extends SwitchHandler {}

interface TabProps {
  className?: string;
  disabled?: boolean;
  value: string | number;
  children: React.ReactNode;
  selected?: boolean;
  onClick?: (e: Event, value: string | number) => void;
  tabIndex?: number;
  color?: Color;
  colorOn?: Color;
  ref?: React.Ref<HTMLElement>;
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
  children?: React.ReactNode;
  name?: string;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  colorFocus?: Color;
  size?: 'medium' | 'large';
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
  children?: React.ReactNode;
  name?: string;
  bgType?: Fill;
  color?: Color;
  textColor?: Color;
  colorFocus?: Color;
  size?: 'medium' | 'large';
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

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  content: React.ReactNode;
  action?: 'click' | 'hover' | 'focus' | 'none';
  arrow?: boolean;
  placement?: PlacementType;
  positionFixed?: boolean;
  component?: string;
  offset?: number;
  ref?: React.Ref<HTMLElement>;
  open?: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
  color?: Color;
  zIndex?: number;
  overlay?: boolean;
  overlayColor?: Color;
  overlayOpacity?: number;
  overlayZIndex?: number;
  overlayProps?: React.HTMLAttributes<HTMLDivElement>;
  usePortal?: boolean;
  preventOverflow?: boolean,
  classNameTooltip?: string;
  classNameTooltipContent?: string;
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
  usePortal?: boolean;
  preventOverflow?: boolean,
  classNameTooltip?: string;
  classNameTooltipContent?: string;
}

interface TypographyBasicProps {
  type?: TypographyType
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
  name: RegExp;
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
declare const Button: React.ComponentType<ButtonProps>;
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

declare function getWindowSize(): WindowSize;
declare function getDeviceInfo(): DeviceInfo;
declare function uuid(): string;
declare const regExps: RegExps;
declare function validator(
  value: string | number,
  types: (ValidationType|((value: string | number) => boolean))[],
  ignoreStartAndEndSpaces?: boolean,
): boolean;