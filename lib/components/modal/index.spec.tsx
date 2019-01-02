import * as React from 'react';
import { mount } from 'enzyme';
import { Modal } from './index';

describe('<Modal />', () => {
  it('render without errors', () => {
    const wrapper: any = mount(
      <Modal>
        <div>
          Content
        </div>
      </Modal>,
    );

    expect(wrapper.instance().bodyElement.outerHTML)
      .toBe('<body><div class="modal"><div>Content</div></div></body>');
    expect(wrapper.html()).toBe('<div>Content</div>');
  });

  it('unmount without errors', () => {
    const wrapper = mount(
      <Modal>
        <div>
          Content
        </div>
      </Modal>,
    );

    wrapper.unmount();
  });
});
