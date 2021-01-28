import React from 'react';
import { PhoneField } from 'lib-react-components';

export default function Usage() {
  return (
    <>
      <PhoneField
        placeholder="Phone"
      />
      <br/>
      <PhoneField
        placeholder="Phone default value"
        defaultValue="+78005553535"
        defaultCountry="RU"
      />
      <br/>
      <PhoneField
        placeholder="Phone default country"
        required
        defaultCountry="UA"
      />
      <br/>
      <PhoneField
        placeholder="Phone disabled"
        disabled
      />
    </>
  );
}
