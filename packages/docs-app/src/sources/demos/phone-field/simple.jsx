import React from 'react';
import { PhoneField } from 'lib-react-components';

export default function Usage() {
  return (
    <>
      <PhoneField />
      <br/>
      <PhoneField
        defaultValue="+7 800 555 35 35"
      />
      <br/>
      <PhoneField
        required
        defaultCountry="UA"
      />
      <br/>
      <PhoneField
        disabled
      />
    </>
  );
}
