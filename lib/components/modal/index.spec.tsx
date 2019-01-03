import * as React from 'react';
import { mount } from 'enzyme';
import { Modal } from './index';

describe('<Modal />', () => {
  it('expect default render', () => {
    const wrapper: any = mount(
      <Modal>
        Content
      </Modal>,
    );

    expect(wrapper.instance().bodyElement.outerHTML)
      // tslint:disable-next-line
      .toBe('<body><div class="modal" data-component="modal" data-center="false"><div class="modal_overlay fill_white" style="opacity: 1;"></div><div class="modal_content">Content</div></div></body>');

    wrapper.unmount();
  });

  it('expect change overlay class for background color', () => {
    const wrapper: any = mount(
      <Modal
        color="black"
      >
        Content
      </Modal>,
    );

    expect(wrapper.instance().bodyElement.outerHTML)
      // tslint:disable-next-line
      .toBe('<body><div class="modal" data-component="modal" data-center="false"><div class="modal_overlay fill_black" style="opacity: 1;"></div><div class="modal_content">Content</div></div></body>');

    wrapper.unmount();
  });

  it('expect add props for content element', () => {
    const wrapper: any = mount(
      <Modal
        contentProps={{ style: { width: 10 } }}
      >
        Content
      </Modal>,
    );

    expect(wrapper.instance().bodyElement.outerHTML)
      // tslint:disable-next-line
      .toBe('<body><div class="modal" data-component="modal" data-center="false"><div class="modal_overlay fill_white" style="opacity: 1;"></div><div style="width: 10px;" class="modal_content">Content</div></div></body>');

    wrapper.unmount();
  });

  it('expect change opacity for overlay', () => {
    const wrapper: any = mount(
      <Modal
        transparent={.1}
      >
        Content
      </Modal>,
    );

    expect(wrapper.instance().bodyElement.outerHTML)
      // tslint:disable-next-line
      .toBe('<body><div class="modal" data-component="modal" data-center="false"><div class="modal_overlay fill_white" style="opacity: 0.1;"></div><div class="modal_content">Content</div></div></body>');

    wrapper.unmount();
  });

  it('expect call close callback after click on overlay element', () => {
    const mockFn = jest.fn();
    const wrapper: any = mount(
      <Modal
        onClose={mockFn}
      >
        Content
      </Modal>,
    );

    wrapper.find('.modal_overlay').simulate('click');

    expect(mockFn).toBeCalled();

    wrapper.unmount();
  });
});
