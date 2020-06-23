/**
 * Get window width and height
 */
export function getWindowSize() {
  const { innerWidth, innerHeight } = window;

  return {
    width: innerWidth,
    height: innerHeight,
  };
}

/**
 * Get window width and height
 */
export function getElementSize(element) {
  const { offsetWidth, offsetHeight } = element;

  return {
    width: offsetWidth,
    height: offsetHeight,
  };
}

/**
 * Get window orietation, depends on rotation angle
 */
export function getWindowOrientation() {
  const { orientation } = window;

  switch (orientation) {
    case 90 || -90:
      return 'landscape';

    default:
      return 'portrait';
  }
}

/**
 * Get device type and sizes
 */
export function getDeviceInfo(element = window) {
  const { width, height } =
    element === window
      ? getWindowSize()
      : getElementSize(element);
  let type = 'desktop';

  if (width <= 1024 && width > 736 && height > 375) {
    type = 'tablet';
  } else if (width <= 736 || (width <= 812 && height <= 375)) {
    type = 'mobile';
  }

  return {
    width,
    height,
    type,
    orientation: getWindowOrientation(),
  };
}
