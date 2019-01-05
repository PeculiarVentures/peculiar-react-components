import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import { Modal } from './index';

const color = {
  primary: 'primary',
  secondary: 'secondary',
  black: 'black',
  grey: 'grey',
  success: 'success',
  wrong: 'wrong',
  white: 'white',
  light_grey: 'light_grey',
};

const props: any = {
  regular: () => ({
    color: select('Overlay color (color)', color, Modal.defaultProps.color),
    transparent: number('Overlay transparent (transparent)', Modal.defaultProps.transparent),
  }),
};

storiesOf('Modal', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <Modal {...regularProps}>
        A man is driving in the city. The maximum speed in the city
        is 60 km per hour. He goes 80 km per hour. A policeman stops the man.
        The policeman comes to the car. The man opens the window.
        <br/>
        <br/>
        “Good afternoon,” says the policeman. “You went very fast. You will pay 50 euros.”
        <br/>
        <br/>
        “I know,” says the man. He is not happy but he gives the money to the policeman.
        <br/>
        <br/>
        “This is your ticket,” says the policeman.
        <br/>
        <br/>
        “I don’t need a ticket. What will I do with the ticket?” says the man.
        <br/>
        <br/>
        “Keep the ticket. When you get four tickets, you will get a bicycle.”
      </Modal>
    );
  })
  .add('center', () => {
    const regularProps = props.regular();

    return (
      <Modal
        {...regularProps}
        center={true}
        contentProps={{ style: { maxWidth: '50vw' } }}
      >
        A man is driving in the city. The maximum speed in the city
        is 60 km per hour. He goes 80 km per hour. A policeman stops the man.
        The policeman comes to the car. The man opens the window.
        <br/>
        <br/>
        “Good afternoon,” says the policeman. “You went very fast. You will pay 50 euros.”
        <br/>
        <br/>
        “I know,” says the man. He is not happy but he gives the money to the policeman.
        <br/>
        <br/>
        “This is your ticket,” says the policeman.
        <br/>
        <br/>
        “I don’t need a ticket. What will I do with the ticket?” says the man.
        <br/>
        <br/>
        “Keep the ticket. When you get four tickets, you will get a bicycle.”
      </Modal>
    );
  });
