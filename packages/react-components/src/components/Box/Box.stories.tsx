import * as React from 'react';
import { select, number } from '@storybook/addon-knobs';
import Box from './index';
import { EStrokeStyle, EStrokeType } from './Box';
import { EColor } from '../../common/props';

const color = [
  '',
  ...Object.keys(EColor),
];
const strokeStyle = [
  '',
  ...Object.keys(EStrokeStyle),
] as (keyof typeof EStrokeStyle)[];
const strokeType = [
  '',
  ...Object.keys(EStrokeType),
] as (keyof typeof EStrokeType)[];

const baseProps = () => ({
  fill: select('fill', color, Box.defaultProps.fill),
  fillOpacity: number('fillOpacity', 1, { min: 0, max: 1, step: 0.1 }),
  stroke: select('stroke', color, Box.defaultProps.stroke),
  strokeWidth: number('strokeWidth', Box.defaultProps.strokeWidth, { min: 0 }),
  strokeOpacity: number('strokeOpacity', 1, { min: 0, max: 1, step: 0.1 }),
  strokeType: select('strokeType', strokeType, Box.defaultProps.strokeType),
  strokeStyle: select('strokeStyle', strokeStyle, Box.defaultProps.strokeStyle),
});

export const Default = () => {
  const props = baseProps();

  return (
    <Box
      style={{
        width: 200,
        height: 200,
      }}
      {...props}
    />
  );
};

export default {
  title: 'Box',
};
