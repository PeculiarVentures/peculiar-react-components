import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Typography from './Typography';

describe('<Typography />', () => {
  it('color', () => {
    const wrapper = mount<Typography>((
      <Typography>
        Test
      </Typography>
    ));

    expect(wrapper.props().color)
      .equal('black');
  });
});
