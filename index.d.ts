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

type Omit<T, K extends keyof T> = Pick<T, ({ [P in keyof T]: P } & { [P in K]: never } & { [x: string]: never, [x: number]: never })[keyof T]>;

/**
 * Avatar
 */
declare namespace Avatar {
  export interface AvatarProps extends React.HTMLProps<Avatar> {
    letters?: string;
    size?: number;
    src?: string;
    defaultSrc?: string;
    bgType?: Fill;
    color?: Color;
    textColor?: Color;
  }
}

declare class Avatar extends React.Component<Avatar.AvatarProps> {}
/**
 * 
 */

/**
 * Button
 */
declare namespace Button {
  export interface ButtonProps extends Omit<React.HTMLProps<Button>, 'size'> {
    children: React.ReactNode;
    bgType?: Fill;
    color?: Color;
    align?: 'left' | 'center' | 'right';
    textColor?: Color;
    size?: 'small' | 'medium' | 'large';
    href?: string;
  }
}

declare class Button extends React.Component<Button.ButtonProps> {}
/**
 * 
 */

/**
 * Checkbox
 */
declare class Checkbox extends React.Component<SwitchHandler.SwitchHandlerProps> {}
/**
 * 
 */

/**
* ContentLoader
*/
declare namespace ContentLoader {
  export interface ContentLoaderProps extends React.HTMLProps<ContentLoader> {
    children: React.ReactNode;
    color?: Color;
    duration?: number;
    height?: number;
    width?: number;
  }
}

declare class ContentLoader extends React.Component<ContentLoader.ContentLoaderProps> {}
/**
 * 
 */

/**
 * CircularProgress
 */
declare namespace CircularProgress {
  export interface CircularProgressProps extends React.HTMLProps<CircularProgress> {
    color?: Color;
    colorProgress?: Color;
    size?: number;
    thickness?: number;
  }
}

declare class CircularProgress extends React.Component<CircularProgress.CircularProgressProps> {}
/**
 * 
 */

/**
 * Counter
 */
declare namespace Counter {
  export interface CounterProps extends Omit<React.HTMLProps<Counter>, 'defaultValue' | 'onChange'> {
    minValue: number;
    maxValue: number;
    onChange: (value: number) => void;
    value?: number;
    defaultValue?: number;
    minValueLabel?: number | string;
    maxValueLabel?: number | string;
    disabled?: boolean;
    bgType?: Fill;
    color?: Color;
    textColor?: Color;
    colorFocus?: Color;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    counterProps?: React.HTMLProps<HTMLDivElement>;
  }
}

declare class Counter extends React.Component<Counter.CounterProps> {}
/**
 * 
 */

/**
 * HighlightCode
 */
declare namespace HighlightCode {
  export interface HighlightCodeProps extends React.HTMLProps<HighlightCode> {
    children: React.ReactNode;
    lang?: CodeType;
  }
}

declare class HighlightCode extends React.Component<HighlightCode.HighlightCodeProps> {}
/**
 * 
 */

/**
 * LinearProgress
 */
declare namespace LinearProgress {
  export interface LinearProgressProps extends React.HTMLProps<LinearProgress> {
    color?: Color;
    colorProgress?: Color;
    value?: number;
  }
}

declare class LinearProgress extends React.Component<LinearProgress.LinearProgressProps> {}
/**
 * 
 */

/**
 * ProgressiveImage
 */
declare namespace ProgressiveImage {
  export interface ProgressiveImageProps extends React.HTMLProps<ProgressiveImage> {
    children: React.ReactNode;
    onError?: (e: React.SyntheticEvent<ProgressiveImage>) => void;
    placeholder?: string;
    src?: string;
  }
}

declare class ProgressiveImage extends React.Component<ProgressiveImage.ProgressiveImageProps> {}
/**
 * 
 */

/**
 * Radio
 */
declare namespace Radio {
  export interface RadioProps extends Omit<React.HTMLProps<Radio>, 'onChange'> {
    checked?: boolean;
    disabled?: boolean;
    name?: string;
    value?: string;
    onChange?: (e: React.FormEvent<Radio>, value: boolean) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    labelPosition?: 'left' | 'right';
    className?: string;
    tabIndex?: number;
    bgType?: Fill;
    color?: Color;
    colorOn?: Color;
    iconColor?: Color;
    iconColorOn?: Color;
  }
}

declare class Radio extends React.Component<Radio.RadioProps> {}
/**
 * 
 */

/**
 * RadioGroup
 */
declare namespace RadioGroup {
  export interface RadioGroupProps extends Omit<React.HTMLProps<RadioGroup>, 'onChange'> {
    children: React.ReactNode;
    name: string;
    defaultValue?: string;
    value?: string;
    onChange?: (e: React.FormEvent<RadioGroup>, value: string) => void;
    className?: string;
  }
}

declare class RadioGroup extends React.Component<RadioGroup.RadioGroupProps> {}
/**
 * 
 */


/**
 * Select
 */
declare namespace Select {
  export interface SelectProps extends Omit<React.HTMLProps<Select>, 'placeholder' | 'size' | 'defaultValue' | 'onFocus' | 'onBlur' | 'onChange' | 'onKeyDown'> {
    children: React.ReactNode;
    native?: boolean;
    name?: string;
    disabled?: boolean;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (e: React.FormEvent<Select>, value: string | number, name: string) => void;
    onFocus?: (e: React.FocusEvent<Select>, name: string) => void;
    onBlur?: (e: React.FocusEvent<Select>, name: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<Select>, name: string) => void;
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
  }
}

declare class Select extends React.Component<Select.SelectProps> {}
/**
 * 
 */

/**
 * SelectDropdown
 */
declare namespace SelectDropdown {
  export interface SelectDropdownProps extends React.HTMLProps<SelectDropdown> {
    children?: React.ReactNode;
    bgType?: Fill;
    color?: Color;
    colorFocus?: Color;
  }
}

declare class SelectDropdown extends React.Component<SelectDropdown.SelectDropdownProps> {}
/**
 * 
 */

/**
 * SelectItem
 */
declare namespace SelectItem {
  export interface SelectItemProps extends Omit<React.HTMLProps<SelectItem>, 'size'> {
    children: React.ReactNode;
    value: string | number;
    selected?: boolean;
    disabled?: boolean;
    hasFocus?: boolean;
    textColor?: Color;
    colorFocus?: Color;
    size?: 'medium' | 'large';
  }
}

declare class SelectItem extends React.Component<SelectItem.SelectItemProps> {}
/**
 * 
 */

/**
 * Slider
 */
declare namespace Slider {
  export interface SliderProps extends Omit<React.HTMLProps<Slider>, 'defaultValue' | 'onChange'> {
    defaultValue?: number;
    disabled?: boolean;
    max?: number;
    min?: number;
    name?: string;
    onChange?: (e: React.FormEvent<Slider>, value: number) => void;
    onDragStart?: (e: React.DragEvent<Slider>) => void;
    onDragStop?: (e: React.DragEvent<Slider>) => void;
    onMouseDown?: (e: React.MouseEvent<Slider>) => void;
    onTouchStart?: (e: React.TouchEvent<Slider>) => void;
    required?: boolean;
    step?: number;
    value?: number;
    className?: string;
    tabIndex?: number;
    color?: Color;
    iconColor?: Color;
    inputProps?: React.HTMLProps<HTMLInputElement>;
  }
}

declare class Slider extends React.Component<Slider.SliderProps> {}
/**
 * 
 */

/**
 * Snackbar
 */
declare namespace Snackbar {
  export interface SnackbarProps extends Omit<React.HTMLProps<Snackbar>, 'action'> {
    children: React.ReactNode;
    autoHideDuration?: number;
    className?: string;
    onClose?: (value: null, action: string) => void;
    onMouseLeave?: (e: React.MouseEvent<Snackbar>) => void;
    onMouseEnter?: (e: React.MouseEvent<Snackbar>) => void;
    open?: boolean;
    fullWidth?: boolean;
    verticalPosition?: 'top' | 'bottom';
    horizontalPosition?: 'left' | 'center' | 'right';
    action?: React.ReactNode;
    color?: Color;
    textColor?: Color;
  }
}

declare class Snackbar extends React.Component<Snackbar.SnackbarProps> {}
/**
 * 
 */

/**
 * SwitchHandler
 */
declare namespace SwitchHandler {
  export interface SwitchHandlerProps extends React.HTMLProps<SwitchHandler> {
    defaultChecked?: boolean;
    disabled?: boolean;
    onCheck?: (e: Event, checked: boolean) => void;
    checked?: boolean;
    inputProps?: React.HTMLProps<HTMLInputElement>;
    className?: string;
    tabIndex?: number;
    bgType?: Fill;
    color?: Color;
    colorOn?: Color;
    iconColor?: Color;
    iconColorOn?: Color;
  }
}

declare class SwitchHandler extends React.Component<SwitchHandler.SwitchHandlerProps> {}
/**
 * 
 */

/**
 * Switch
 */
declare class Switch extends React.Component<SwitchHandler.SwitchHandlerProps> {}
/**
 * interface SwitchProps extends SwitchHandler {}
 */

/**
 * Tab
 */
declare namespace Tab {
  export interface TabProps extends Omit<React.HTMLProps<Tab>, 'onClick'> {
    className?: string;
    disabled?: boolean;
    value: string | number;
    children: React.ReactNode;
    selected?: boolean;
    onClick?: (e: React.MouseEvent<Tab>, value: string | number) => void;
    tabIndex?: number;
    color?: Color;
    colorOn?: Color;
  }
}

declare class Tab extends React.Component<Tab.TabProps> {}
/**
 * 
 */

/**
 * Tabs
 */
declare namespace Tabs {
  export interface TabsProps extends Omit<React.HTMLProps<Tabs>, 'onClick' | 'defaultValue' | 'onChange'> {
    children: React.ReactNode;
    defaultValue?: string | number;
    value?: string | number;
    onChange?: (e: React.MouseEvent<Tabs>, value: string | number) => void;
    color?: Color;
    colorOn?: Color;
    align?: 'left' | 'center' | 'right';
    className?: string;
  }
}

declare class Tabs extends React.Component<Tabs.TabsProps> {}
/**
 * 
 */

/**
 * Input
 */
declare namespace Input {
  export interface InputProps extends Omit<React.HTMLProps<Input>, 'size' | 'defaultValue'> {
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
    inputProps?: React.HTMLProps<HTMLInputElement>;
    autoComplete?: string;
    autoFocus?: boolean;
    onChange?: (e: React.FormEvent<Input>) => void;
  }
}

declare class Input extends React.Component<Input.InputProps> {}
/**
 * 
 */

/**
 * TextField
 */
declare namespace TextField {
  export interface TextFieldProps extends Omit<React.HTMLProps<Input>, 'size' | 'defaultValue' | 'onChange'> {
    tabIndex?: number;
    className?: string;
    defaultValue?: string | number;
    disabled?: boolean;
    multiLine?: boolean;
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
    inputProps?: React.HTMLProps<HTMLInputElement>;
    autoComplete?: string;
    autoFocus?: boolean;
    onChange?: (e: React.FormEvent<Input>, valid: boolean) => void;
    onChangeType?: (type: string) => void;
    onKeyUp?: (e: React.KeyboardEvent<Input>) => void;
    onEnterPress?: (e: React.KeyboardEvent<Input>) => void;
    type?: 'text'
      | 'password'
      | 'email'
      | 'tel'
      | 'date';
    validation?: (ValidationType|((value: string | number) => boolean))[];
  }
}

declare class TextField extends React.Component<TextField.TextFieldProps> {}
/**
 * 
 */

/**
 * Tooltip
 */
declare namespace Tooltip {
  export interface TooltipProps extends Omit<React.HTMLProps<Tooltip>, 'content'> {
    children: React.ReactNode;
    content: React.ReactNode;
    action?: 'click' | 'hover' | 'focus';
    arrow?: boolean;
    placement?: PlacementType;
    positionFixed?: boolean;
    component?: string;
    offset?: number;
    open?: boolean;
    onClose?: () => void;
    autoHideDuration?: number;
  }
}

declare class Tooltip extends React.Component<Tooltip.TooltipProps> {}
/**
 * 
 */

/**
 * TooltipPopper
 */
declare namespace TooltipPopper {
  export interface TooltipPopperProps extends React.HTMLProps<TooltipPopper> {
    open: boolean;
    children: React.ReactNode;
    arrow?: boolean;
    placement?: PlacementType;
    positionFixed?: boolean;
    offset?: number;
    referenceElement?: React.Ref<HTMLElement>;
  }
}

declare class TooltipPopper extends React.Component<TooltipPopper.TooltipPopperProps> {}
/**
 * 
 */

/**
 * Typography
 */
declare namespace Typography {
  export interface TypographyProps extends React.HTMLProps<Typography> {
    children: React.ReactNode;
    type?: TypographyType
    tabletType?: TypographyType;
    mobileType?: TypographyType;
    color?: Color;
    align?: 'left' | 'center' | 'right' | 'auto';
    className?: string;
  }
}

declare class Typography extends React.Component<Typography.TypographyProps> {}
/**
 * 
 */

/**
 * Icons
 */
declare class CheckmarkIcon extends React.Component<React.SVGAttributes<SVGAElement>> {}
declare class EyeInvisibleIcon extends React.Component<React.SVGAttributes<SVGAElement>> {}
declare class EyeVisibleIcon extends React.Component<React.SVGAttributes<SVGAElement>> {}
declare class RequiredIcon extends React.Component<React.SVGAttributes<SVGAElement>> {}
declare class SelectArrowIcon extends React.Component<React.SVGAttributes<SVGAElement>> {}
/**
 * 
 */

/**
 * DeviceProvider
 */
declare namespace DeviceProvider {
  export interface DeviceProviderProps extends React.HTMLProps<DeviceProvider> {
    children: React.ReactNode;
  }
}

declare class DeviceProvider extends React.Component<DeviceProvider.DeviceProviderProps> {}
/**
 * 
 */

/**
 * OfflineProvider
 */
declare namespace OfflineProvider {
  export interface OfflineProviderProps extends React.HTMLProps<OfflineProvider> {
    children: React.ReactNode;
  }
}

declare class OfflineProvider extends React.Component<OfflineProvider.OfflineProviderProps> {}
/**
 * 
 */

/**
 * Portal
 */
declare namespace Portal {
  export interface PortalProps extends React.HTMLProps<Portal> {
    children: React.ReactNode;
    container?: HTMLElement;
    onRendered?: () => void;
  }
}

declare class Portal extends React.Component<Portal.PortalProps> {}
/**
 * 
 */

/**
 * SegueHandler
 */
declare namespace SegueHandler {
  export interface SegueHandlerProps extends Omit<React.HTMLProps<SegueHandler>, 'defaultValue'> {
    children: React.ReactNode;
    value?: string | number;
    defaultValue?: string | number;
  }
}

declare class SegueHandler extends React.Component<SegueHandler.SegueHandlerProps> {}
/**
 * 
 */

/**
 * utils
 */
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

declare function getDeviceInfo(): DeviceInfo;
declare function getWindowSize(): WindowSize;
declare function uuid(): string;
declare function validator(
  value: string | number,
  types: (ValidationType|((value: string | number) => boolean))[],
  ignoreStartAndEndSpaces?: boolean,
): boolean;
declare const regExps: RegExps;
/**
 * 
 */

export {
  Avatar,
  Button,
  Checkbox,
  ContentLoader,
  CircularProgress,
  Counter,
  HighlightCode,
  LinearProgress,
  ProgressiveImage,
  Radio,
  RadioGroup,
  Select,
  SelectDropdown,
  SelectItem,
  Slider,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  Input,
  TextField,
  Tooltip,
  TooltipPopper,
  Typography,
  CheckmarkIcon,
  EyeInvisibleIcon,
  EyeVisibleIcon,
  RequiredIcon,
  SelectArrowIcon,
  DeviceProvider,
  OfflineProvider,
  Portal,
  SegueHandler,
  getDeviceInfo,
  getWindowSize,
  uuid,
  validator,
  regExps,
};
