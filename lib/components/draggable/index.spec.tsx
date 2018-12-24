import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Draggable, DraggableProps } from '../../../';

jest.useFakeTimers();

describe('Draggable', () => {
  let wrapper: ReactWrapper<DraggableProps, {}, Draggable> | null;

  function getStyle(obj: HTMLDivElement) {
    return {
      left: obj.style.left,
      top: obj.style.top,
      width: obj.style.width,
      height: obj.style.height,
    };
  }

  const basicProps: DraggableProps = {
    containerSizes: [500, 500],
    rect: [25, 25, 50, 50],
  };

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });
  it('.Precision rounds a number', () => {
    expect(Draggable.Precision(0.777777777777)).toBe(0.77777778);
  });

  it('.rectIntersect found an intersaction', () => {
    expect(Draggable.rectIntersect(
      [0, 5, 10, 10],
      [5, 0, 10, 10],
    )).toBe(true);

    expect(Draggable.rectIntersect(
      [0, 0, 10, 10],
      [10, 10, 10, 10],
    )).toBe(false);
  });

  it('.isRectsEqual found requal rects', () => {
    expect(Draggable.isRectsEqual(
      [0, 5, 10, 10],
      [5, 0, 10, 10],
    )).toBe(false);

    expect(Draggable.isRectsEqual(
      [10, 10, 10, 10],
      [10, 10, 10, 10],
    )).toBe(true);
  });

  it('.rectToPixels correctly converts a rectangle', () => {
    expect(Draggable.rectToPixels(
      [100, 100],
      [5, 0, 10, 10],
    )).toEqual([5, 0, 10, 10]);
  });

  it('.rectToPercents correctly converts a rectangle', () => {
    expect(Draggable.rectToPercents(
      [100, 100],
      [5, 0, 10, 10],
    )).toEqual([5, 0, 10, 10]);
  });

  it('.getCoordsFromEvent returns correct coordinates', () => {
    const event = { nativeEvent: { layerX: 10, layerY: 10 } };
    expect(Draggable.getCoordsFromEvent(event as React.MouseEvent)).toEqual([10, 10]);
  });

  it('do not render anything if drag not available', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
        active={false}
      />,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('[data-drag="bottom_right"]').exists()).toBe(false);
  });

  it('start drag on mouse down', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
      />,
      global.defaultComponentOptions,
    );

    wrapper.find('[data-drag="bottom_right"]').simulate('mousedown');
    wrapper.update();

    expect(wrapper.instance().activeElement).toBe('bottom_right');
  });

  it('modify rect size on movement', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
        rect={[0, 0, 0, 0]}
      />,
      global.defaultComponentOptions,
    );

    const field = document.createElement('div');
    wrapper.instance().setFieldElement(field);
    wrapper.instance().activeElement = 'bottom_right';

    const event = new MouseEvent('mouseevent') as any;

    event.deltaX = 50;
    event.deltaY = 50;

    wrapper.instance().onPan(event);

    expect(getStyle(field)).toEqual({
      left: '0%',
      top: '0%',
      width: '10%',
      height: '10%',
    });
  });

  it('modify rect position on movement', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
        rect={[0, 0, 0, 0]}
      />,
      global.defaultComponentOptions,
    );

    const field = document.createElement('div');
    wrapper.instance().setFieldElement(field);
    wrapper.instance().activeElement = '';

    const event = new MouseEvent('mouseevent') as any;

    event.deltaX = 50;
    event.deltaY = 50;

    wrapper.instance().onPan(event);

    expect(getStyle(field)).toEqual({
      left: '10%',
      top: '10%',
      width: '0%',
      height: '0%',
    });
  });

  it('modify rect size and position on movement', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
        rect={[0, 0, 0, 0]}
      />,
      global.defaultComponentOptions,
    );

    wrapper.instance().getCurrentRect = () => [0, 0, 20, 20];

    const field = document.createElement('div');
    wrapper.instance().setFieldElement(field);
    wrapper.instance().activeElement = 'top_left';

    const event = new MouseEvent('mouseevent') as any;

    event.deltaX = 50;
    event.deltaY = 50;

    wrapper.instance().onPan(event);

    expect(getStyle(field)).toEqual({
      left: '10%',
      top: '10%',
      width: '10%',
      height: '10%',
    });
  });
  it('send modification event on mouse up', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <Draggable
        {...basicProps}
        onChange={onChange}
        rect={[0, 0, 0, 0]}
      />,
      global.defaultComponentOptions,
    );

    const field = document.createElement('div');
    wrapper.instance().setFieldElement(field);
    wrapper.instance().activeElement = '';

    const event = new MouseEvent('mouseevent') as any;
    event.deltaX = 50;
    event.deltaY = 50;
    wrapper.instance().onPan(event);

    wrapper.instance().onPanEnd(event);

    expect(onChange).toBeCalledWith([10, 10, 0, 0]);
  });

  it('cancel on pressing escape', () => {
    const onCancel = jest.fn();
    wrapper = mount(
      <Draggable
        {...basicProps}
        onCancel={onCancel}
      />,
      global.defaultComponentOptions,
    );

    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'Escape' } });

    expect(onCancel).toBeCalledTimes(1);
  });

  it('remove on pressing backspace or delete', () => {
    const onRemove = jest.fn();
    wrapper = mount(
      <Draggable
        {...basicProps}
        onRemove={onRemove}
      />,
      global.defaultComponentOptions,
    );

    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'Backspace' } });
    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'Delete' } });

    expect(onRemove).toBeCalledTimes(2);
  });

  it('move field by arrow keys', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
        rect={[20, 20, 20, 20]}
      />,
      global.defaultComponentOptions,
    );

    wrapper.instance().getCurrentRect = () => [20, 20, 20, 20];
    const basicStyle = {
      left: '20%',
      top: '20%',
      width: '20%',
      height: '20%',
    };

    const field = document.createElement('div');
    wrapper.instance().setFieldElement(field);

    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'ArrowLeft' } });
    wrapper.find('div').at(0).simulate('keyup', { nativeEvent: { code: 'ArrowLeft' } });

    expect(getStyle(field)).toEqual({ ...basicStyle, left: '19.8%' });

    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'ArrowRight' } });
    wrapper.find('div').at(0).simulate('keyup', { nativeEvent: { code: 'ArrowRight' } });

    expect(getStyle(field)).toEqual(basicStyle);

    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'ArrowUp' } });
    wrapper.find('div').at(0).simulate('keyup', { nativeEvent: { code: 'ArrowUp' } });

    expect(getStyle(field)).toEqual({ ...basicStyle, top: '19.8%' });

    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'ArrowDown' } });
    wrapper.find('div').at(0).simulate('keyup', { nativeEvent: { code: 'ArrowDown' } });

    expect(getStyle(field)).toEqual(basicStyle);
  });

  it('move field by several arrow keys at same time', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
        rect={[20, 20, 20, 20]}
      />,
      global.defaultComponentOptions,
    );

    wrapper.instance().getCurrentRect = () => [20, 20, 20, 20];
    const basicStyle = {
      left: '20%',
      top: '20%',
      width: '20%',
      height: '20%',
    };

    const field = document.createElement('div');
    wrapper.instance().setFieldElement(field);

    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'ArrowLeft' } });
    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'ArrowDown' } });

    expect(getStyle(field)).toEqual({ ...basicStyle, left: '19.6%', top: '20.2%' });
  });

  it('move field by arrow keys with shift key pressed', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
        rect={[20, 20, 20, 20]}
      />,
      global.defaultComponentOptions,
    );

    wrapper.instance().getCurrentRect = () => [20, 20, 20, 20];
    const basicStyle = {
      left: '20%',
      top: '20%',
      width: '20%',
      height: '20%',
    };

    const field = document.createElement('div');
    wrapper.instance().setFieldElement(field);

    wrapper.find('div').at(0).simulate('keydown', {
      nativeEvent: { code: 'ArrowLeft' },
      shiftKey: true,
    });

    expect(getStyle(field)).toEqual({ ...basicStyle, left: '19%' });
  });

  it('enable freeTransform by pressing shift key', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
      />,
      global.defaultComponentOptions,
    );

    wrapper.find('div').at(0).simulate('keydown', { nativeEvent: { code: 'ShiftLeft' } });

    expect(wrapper.instance().freeTransform).toBe(true);
  });

  it('disable freeTransform by releasing shift key', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
      />,
      global.defaultComponentOptions,
    );

    wrapper.instance().freeTransform = true;
    wrapper.find('div').at(0).simulate('keyup', { nativeEvent: { code: 'ShiftLeft' } });

    expect(wrapper.instance().freeTransform).toBe(false);
  });

  it('re-init listeners after back to draggable mode', () => {
    wrapper = mount(
      <Draggable
        {...basicProps}
        active={true}
      />,
      global.defaultComponentOptions,
    );

    const field = document.createElement('div');
    wrapper.instance().setFieldElement(field);

    wrapper.setProps({ active: false });
    wrapper.update();

    const initMock = jest.spyOn(wrapper.instance(), 'setupHammer');

    wrapper.setProps({ active: true });
    wrapper.update();

    expect(initMock).toBeCalledTimes(1);
  });
});
