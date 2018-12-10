import React from 'react';
import { ButtonWithIcon } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <ButtonWithIcon
        style={{
          marginRight: 10,
        }}
        textColor="primary"
        bgType="stroke"
        icon="add"
        iconColor="primary"
      >
        add
      </ButtonWithIcon>
      <ButtonWithIcon
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        color="secondary"
        textColor="secondary"
        iconColor="secondary"
        icon="arrow_left"
      >
        arrow_left
      </ButtonWithIcon>
      <ButtonWithIcon
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        color="secondary"
        textColor="secondary"
        iconColor="secondary"
        icon="arrow_right"
      >
        arrow_right
      </ButtonWithIcon>
      <ButtonWithIcon
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        color="grey"
        textColor="grey"
        iconColor="grey"
        icon="clear"
      >
        clear
      </ButtonWithIcon>
      <ButtonWithIcon
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        color="dark_grey"
        textColor="dark_grey"
        iconColor="dark_grey"
        icon="cross"
      >
        cross
      </ButtonWithIcon>
      <ButtonWithIcon
        style={{
          marginRight: 10,
          marginTop: 10,
        }}
        bgType="stroke"
        color="wrong"
        textColor="wrong"
        iconColor="wrong"
        icon="delete"
      >
        delete
      </ButtonWithIcon>
      <ButtonWithIcon
        style={{
          marginRight: 10,
          marginTop: 10,
        }}
        bgType="stroke"
        color="success"
        textColor="success"
        iconColor="success"
        icon="rotate"
      >
        rotate
      </ButtonWithIcon>
      <ButtonWithIcon
        style={{
          marginRight: 10,
          marginTop: 10,
        }}
        bgType="stroke"
        textColor="primary"
        icon="undo"
        iconColor="primary"
      >
        undo
      </ButtonWithIcon>
    </div>
  );
}

