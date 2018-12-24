import React, { createRef } from 'react';
import classNames from 'classnames';

export type FieldRect = [number, number, number, number];
export type Vec2 = [number, number];

let Hammer: any;

if (window) {
  Hammer = require('hammerjs');
}

export interface IDraggableProps {
  rect: FieldRect;
  containerSizes: Vec2;
  onChange?: (rect: FieldRect) => void;
  onRemove?: () => void;
  onCancel?: () => void;
  active?: boolean;
  color?: string;
}

export class Rect {
  data: FieldRect;
  limits: Vec2 = [1, 1];
  minSize: Vec2 = [0, 0];

  static fromPercents(rect: FieldRect, containerSizes: Vec2) {
    return new Rect(Draggable.rectToPixels(containerSizes, rect));
  }

  constructor(data: FieldRect) {
    this.data = data;
  }

  setLimits(limits: Vec2, minSize: Vec2) {
    this.limits = limits;
    this.minSize = minSize;
  }

  minMax(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min);
  }

  changePosition(dx: number, dy: number): FieldRect {
    const w = this.data[2];
    const h = this.data[3];
    const x = this.data[0] + dx;
    const y = this.data[1] + dy;

    return [
      this.minMax(x, 0, this.limits[0] - w),
      this.minMax(y, 0, this.limits[1] - h),
      w,
      h,
    ];
  }

  changeStartPoint(originalRect: FieldRect, result: FieldRect, dc: number, coord: 0 | 1) {
    const sizeI = coord + 2;
    const coordDiff = this.minMax(
      dc,
      -originalRect[coord],
      originalRect[sizeI] - this.minSize[coord],
    );
    result[coord] = originalRect[coord] + coordDiff;
    result[sizeI] = originalRect[sizeI] - coordDiff;
  }

  changeEndPoint(originalRect: FieldRect, result: FieldRect, dc: number, coord: 0 | 1) {
    const pos = originalRect[coord];
    const size = originalRect[coord + 2];
    const coordDiff = this.minMax(
      dc,
      this.minSize[coord] - size,
      this.limits[coord] - pos - size,
    );
    result[coord + 2] = size + coordDiff;
  }

  changeSize(type: string, dx: number, dy: number): FieldRect {
    const result: FieldRect = [this.data[0], this.data[1], this.data[2], this.data[3]];

    if (type.indexOf('top') >= 0) {
      this.changeStartPoint(this.data, result, dy, 1);
    }
    if (type.indexOf('bottom') >= 0) {
      this.changeEndPoint(this.data, result, dy, 1);
    }
    if (type.indexOf('left') >= 0) {
      this.changeStartPoint(this.data, result, dx, 0);
    }
    if (type.indexOf('right') >= 0) {
      this.changeEndPoint(this.data, result, dx, 0);
    }

    return result;
  }
}

export default class Draggable<P extends IDraggableProps = IDraggableProps, S = {}>
  extends React.Component<P, S> {
  hammer?: HammerManager;
  mainRef = createRef<HTMLDivElement>();
  fieldElement?: HTMLDivElement;
  initialRect?: Rect;
  rect: FieldRect = [0, 0, 0, 0];
  activeElement: string = '';
  pressedKeys: string[] = [];
  freeTransform: boolean = false;
  started: boolean = false;

  static Precision = (num: number) => Math.round(num * 100000000) / 100000000;

  static rectIntersect(r1: number[], r2: number[]) {
    return !(
      (Draggable.Precision(r2[0])) >= Draggable.Precision(r1[0] + r1[2]) ||
      Draggable.Precision(r1[0]) >= Draggable.Precision(r2[0] + r2[2]) ||
      Draggable.Precision(r2[1]) >= Draggable.Precision(r1[1] + r1[3]) ||
      Draggable.Precision(r1[1]) >= Draggable.Precision(r2[1] + r2[3])
    );
  }

  static isRectsEqual(r1: number[], r2: number[]) {
    return (
      r1[0] === r2[0] &&
      r1[1] === r2[1] &&
      r1[2] === r2[2] &&
      r1[3] === r2[3]
    );
  }

  static rectToPixels(contianerSize: Vec2, rect: FieldRect): FieldRect {
    return [
      rect[0] / 100 * contianerSize[0],
      rect[1] / 100 * contianerSize[1],
      rect[2] / 100 * contianerSize[0],
      rect[3] / 100 * contianerSize[1],
    ];
  }

  static rectToPercents(contianerSize: Vec2, rect: FieldRect): FieldRect {
    return [
      rect[0] * 100 / contianerSize[0],
      rect[1] * 100 / contianerSize[1],
      rect[2] * 100 / contianerSize[0],
      rect[3] * 100 / contianerSize[1],
    ];
  }

  static getCoordsFromEvent(
    event: React.MouseEvent<any> | React.TouchEvent<any>,
  ): Vec2 {
    let x = 0;
    let y = 0;
    if ('layerX' in event.nativeEvent) {
      x = event.nativeEvent.layerX;
      y = event.nativeEvent.layerY;
    }

    return [x, y];
  }

  componentDidMount() {
    if (this.mainRef.current) {
      this.setFieldElement(this.mainRef.current);
      this.applyToElement(this.props.rect);
    }
  }

  componentDidUpdate() {
    this.setInitialRect(true);

    if (this.isDraggable() && !this.hammer) {
      this.setupHammer();
    }
    if (!this.isDraggable() && this.hammer) {
      this.hammer.destroy();
      this.hammer = undefined;
    }
  }

  componentWillUnmount() {
    if (this.hammer) {
      this.hammer.destroy();
    }
  }

  isDraggable() {
    return this.props.active !== false;
  }

  getCurrentRect(): FieldRect {
    return this.props.rect;
  }

  submitChange(rect: FieldRect) {
    if (this.props.onChange) {
      this.props.onChange(rect);
    }
  }

  isGuidesVisible() {
    return this.isDraggable();
  }

  isDraggableControlsVisible() {
    return this.isDraggable();
  }

  onRemove() {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }

  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  setupHammer() {
    if (this.fieldElement) {
      this.hammer = new Hammer(this.fieldElement);
      if (this.hammer) {
        this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
        this.hammer.on('pan', this.onPan);
        this.hammer.on('panend', this.onPanEnd);
      }
    }
  }

  setFieldElement(fieldElement: HTMLDivElement) {
    this.fieldElement = fieldElement;
    this.setupHammer();
  }

  applyToElement(rect: FieldRect) {
    if (this.fieldElement) {
      this.fieldElement.style.left = `${rect[0]}%`;
      this.fieldElement.style.top = `${rect[1]}%`;
      this.fieldElement.style.width = `${rect[2]}%`;
      this.fieldElement.style.height = `${rect[3]}%`;
    }
  }

  setInitialRect(force: boolean = false) {
    if (!this.initialRect || force) {
      const { containerSizes } = this.props;
      const rect = this.getCurrentRect();
      this.initialRect = Rect.fromPercents(rect, containerSizes);
      this.initialRect.setLimits(containerSizes, [20, 20]);
    }
  }

  moveByPressedKey(fixedStep: boolean) {
    const { containerSizes } = this.props;
    const step = fixedStep ? Math.round(containerSizes[0] / 100) : 1;
    let dx = 0;
    let dy = 0;

    if (this.pressedKeys.indexOf('ArrowLeft') >= 0) {
      dx -= step;
    }
    if (this.pressedKeys.indexOf('ArrowUp') >= 0) {
      dy -= step;
    }
    if (this.pressedKeys.indexOf('ArrowRight') >= 0) {
      dx += step;
    }
    if (this.pressedKeys.indexOf('ArrowDown') >= 0) {
      dy += step;
    }

    if ((dx || dy) && this.initialRect && this.isDraggable()) {
      this.rect = this.initialRect.changePosition(dx, dy);
      this.initialRect.data = this.rect;
      const result = Draggable.rectToPercents(containerSizes, this.rect);
      this.applyToElement(result);
      this.submitChange(result);
    }
  }

  onPan = (event: HammerInput) => {
    if (this.isDraggableControlsVisible() || this.activeElement === 'drag') {
      const { deltaX, deltaY } = event;
      event.preventDefault();

      this.started = true;
      this.setInitialRect();

      if (this.initialRect) {
        if (this.activeElement && this.activeElement !== 'drag') {
          this.rect = this.initialRect.changeSize(this.activeElement, deltaX, deltaY);
        } else {
          this.rect = this.initialRect.changePosition(deltaX, deltaY);
        }
      }

      this.applyToElement(Draggable.rectToPercents(this.props.containerSizes, this.rect));
    }
  }

  onPanEnd = (event: HammerInput) => {
    if (this.started) {
      const { containerSizes } = this.props;

      event.preventDefault();
      this.started = false;

      this.submitChange(Draggable.rectToPercents(containerSizes, this.rect));
      this.initialRect = undefined;
    }
  }

  onMouseDown = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = event.target;

    if (target instanceof HTMLDivElement) {
      this.activeElement = target.getAttribute('data-drag') || '';
    }
  }

  onGuidesEnable() {
    this.freeTransform = true;
  }

  onGuidesDisable() {
    this.freeTransform = false;
  }

  onKeyDown = (event: React.KeyboardEvent) => {
    const code = event.nativeEvent.code;
    this.setInitialRect();

    if (code === 'Escape') {
      this.onCancel();
    }

    const prevented = event.target instanceof HTMLElement &&
      event.target.getAttribute('data-prevent-key-events');

    if (this.isDraggableControlsVisible() && !prevented) {
      const code = event.nativeEvent.code;

      if (code === 'ShiftLeft') {
        this.onGuidesEnable();
      }
      if (code === 'Backspace' || code === 'Delete') {
        this.onRemove();
      }
    }

    if (!this.started && !prevented) {
      if (this.pressedKeys.indexOf(code) === -1) {
        this.pressedKeys.push(code);
      }
      event.preventDefault();
      this.moveByPressedKey(event.shiftKey);
    }
  }

  onKeyUp = (event: React.KeyboardEvent) => {
    const code = event.nativeEvent.code;

    if (code === 'ShiftLeft') {
      this.onGuidesDisable();
    }

    this.pressedKeys = this.pressedKeys.filter(key => key !== code);
  }

  renderEditableDot(baseClass: string, innerClass: string, id: string) {
    return (
      <div className={classNames(baseClass, id)} data-drag={id}>
        <div className={classNames(innerClass, 'inner')} />
      </div>
    );
  }

  renderEditableControls() {
    const color = this.props.color || 'primary';

    if (this.isDraggableControlsVisible()) {
      return (
        <React.Fragment>
          {this.renderEditableDot('draggable_dot', `fill_${color}`, 'top_left')}
          {this.renderEditableDot('draggable_dot', `fill_${color}`, 'top_right')}
          {this.renderEditableDot('draggable_dot', `fill_${color}`, 'bottom_left')}
          {this.renderEditableDot('draggable_dot', `fill_${color}`, 'bottom_right')}
          {this.renderEditableDot('draggable_dot_add', `stroke_${color}`, 'bottom')}
          {this.renderEditableDot('draggable_dot_add', `stroke_${color}`, 'top')}
          {this.renderEditableDot('draggable_dot_add', `stroke_${color}`, 'left')}
          {this.renderEditableDot('draggable_dot_add', `stroke_${color}`, 'right')}
        </React.Fragment>
      );
    }

    return null;
  }

  render() {
    const color = this.props.color || 'primary';

    return (
      <div
        ref={this.mainRef}
        {...this.listeners}
        style={{ position: 'absolute' }}
        tabIndex={0}
      >
        <div
          data-role="visual"
          key="backgound"
          className={classNames('draggable_background', `fill_${color}`)}
        />
        <div
          data-role="visual"
          key="border"
          className={classNames('draggable_border', `stroke_${color}`)}
        />
        {this.renderEditableControls()}
      </div>
    );
  }

  listeners = {
    onMouseDown: this.onMouseDown,
    onTouchStart: this.onMouseDown,
    onKeyDown: this.onKeyDown,
    onKeyUp: this.onKeyUp,
  };
}
