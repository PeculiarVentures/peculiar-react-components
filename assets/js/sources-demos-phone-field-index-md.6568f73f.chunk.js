(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{127:function(e,n){e.exports=["# PhoneField\n\n## Simple\n\n",{type:"demo",data:'import React from \'react\';\nimport { PhoneField } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <>\n      <PhoneField\n        placeholder="Phone"\n      />\n      <br/>\n      <PhoneField\n        placeholder="Phone default value"\n        defaultValue="+78005553535"\n        defaultCountry="RU"\n      />\n      <br/>\n      <PhoneField\n        placeholder="Phone default country"\n        required\n        defaultCountry="UA"\n      />\n      <br/>\n      <PhoneField\n        placeholder="Phone disabled"\n        disabled\n      />\n    </>\n  );\n}\n',options:{demo:"/demos/phone-field/simple.jsx",showCode:"true"}},"\n\n## Controlled\n\n",{type:"demo",data:"import React from 'react';\nimport { PhoneField } from 'lib-react-components';\n\nexport default class Usage extends React.Component {\n  state = {\n    value: '',\n    country: '',\n  };\n\n  handleChange = (event) => {\n    this.setState({\n      value: event.target.value,\n      country: event.target.country.name,\n    });\n  }\n\n  render() {\n    const { value, country } = this.state;\n\n    return (\n      <>\n        <PhoneField\n          placeholder=\"Phone\"\n          onChange={this.handleChange}\n        />\n        <br />\n        <p>\n          Value: {value}\n        </p>\n        <p>\n          Country: {country}\n        </p>\n      </>\n    );\n  }\n}\n\n",options:{demo:"/demos/phone-field/controlled.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| autoFocus | bool | false | If true, the input will be focused during the first mount. |\n| bgType | enum: 'fill' &#124;<br> 'stroke'<br> | 'stroke' | Component type one of `fill` or `stroke`. If `fill` - component will be have background-color from `color` props. If `stroke` - component will be have border-color from `color` props. |\n| className | string | \xa0 | The CSS class name of the wrapper element. |\n| color | string | 'light_grey' | Component color from theme. |\n| colorFocus | string | 'primary' | Component focus color from theme. |\n| defaultCountry | string | 'US' | The default selected country. |\n| defaultValue | string | '' | The default input value, useful when not controlling the component. |\n| disabled | bool | false | If true, the input will be disabled. |\n| flip | bool | true | If `true`, component will automatically calc possible dropdown opened direction. |\n| inputProps | object | {} | Properties applied to the input element. |\n| mobileSize | enum: 'medium' &#124;<br> 'large'<br> | \xa0 | Component size for mobile. |\n| name | string | \xa0 | Name attribute of the input element. |\n| onBlur | func | \xa0 | Callback fired when the input left focus. |\n| onChange | func | \xa0 | Callback fired when the value is changed. |\n| onFocus | func | \xa0 | Callback fired when the input receives focus. |\n| onKeyDown | func | \xa0 |  |\n| placeholder | string | \xa0 | The short hint displayed in the input before the user enters a value. |\n| placeholderColor | string | 'grey_4' | Color for the placeholder. |\n| placement | enum: 'top' &#124;<br> 'bottom'<br> | 'bottom' | Component dropdown start opened direction. |\n| required | bool | false | If true, the input will be required. |\n| size | enum: 'medium' &#124;<br> 'large'<br> | 'medium' | Component size. |\n| tabIndex | number | 0 | Element tabIndex. |\n| textColor | string | 'black' | Component text color from theme. |\n| valid | bool | \xa0 | If false, the input will be unvalid styles. |\n"]}}]);
//# sourceMappingURL=sources-demos-phone-field-index-md.6568f73f.chunk.js.map