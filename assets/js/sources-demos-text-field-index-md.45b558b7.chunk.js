(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{160:function(e,n){e.exports=["# TextField\n\n## Stroke\n\n",{type:"demo",data:'import React from \'react\';\nimport { TextField } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <TextField\n        placeholder="Planet name"\n        style={{\n          maxWidth: 300,\n          marginBottom: 10,\n        }}\n        bgType="stroke"\n      />\n      <TextField\n        disabled\n        placeholder="Planet name"\n        style={{\n          maxWidth: 300,\n        }}\n        bgType="stroke"\n      />\n    </div>\n  );\n}\n\n',options:{demo:"/demos/text-field/stroke.jsx",showCode:"true"}},"\n\n## Fill\n\n",{type:"demo",data:"import React from 'react';\nimport { TextField } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <div>\n      <TextField\n        placeholder=\"Planet name\"\n        style={{\n          maxWidth: 300,\n          marginBottom: 10,\n        }}\n      />\n      <TextField\n        disabled\n        placeholder=\"Planet name\"\n        style={{\n          maxWidth: 300,\n        }}\n      />\n    </div>\n  );\n}\n",options:{demo:"/demos/text-field/fill.jsx",showCode:"true"}},"\n\n## Multiline\n\n",{type:"demo",data:"import React from 'react';\nimport { TextField } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <TextField\n      placeholder=\"Planet description\"\n      multiLine\n    />\n  );\n}\n",options:{demo:"/demos/text-field/multiline.jsx",showCode:"true"}},"\n\n## Sizes\n\n",{type:"demo",data:'import React from \'react\';\nimport { TextField } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <TextField\n        placeholder="Planet name"\n        style={{\n          maxWidth: 300,\n          marginBottom: 10,\n        }}\n      />\n      <TextField\n        placeholder="Planet name"\n        size="large"\n        style={{\n          maxWidth: 300,\n          marginBottom: 10,\n        }}\n      />\n      <TextField\n        placeholder="Planet description"\n        multiLine\n        style={{\n          marginBottom: 10,\n        }}\n      />\n      <TextField\n        placeholder="Planet description"\n        multiLine\n        size="large"\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/text-field/sizes.jsx",showCode:"true"}},"\n\n## Controlled\n\n",{type:"demo",data:"import React, { Component } from 'react';\nimport { TextField } from 'lib-react-components';\n\nexport default class Usage extends Component {\n  state = {\n    value: '',\n  };\n\n  render() {\n    const { value } = this.state;\n\n    return (\n      <TextField\n        placeholder=\"Planet name\"\n        style={{\n          maxWidth: 300,\n        }}\n        value={value}\n        onChange={e => this.setState({ value: e.target.value })}\n      />\n    );\n  }\n}\n",options:{demo:"/demos/text-field/controlled.jsx",showCode:"true"}},"\n\n## Other\n\n",{type:"demo",data:'import React from \'react\';\nimport { TextField } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <TextField\n        placeholder="Password input"\n        type="password"\n        style={{\n          maxWidth: 300,\n          marginBottom: 10,\n        }}\n      />\n      <TextField\n        placeholder="Required input"\n        required\n        style={{\n          maxWidth: 300,\n          marginBottom: 10,\n        }}\n      />\n      <TextField\n        placeholder="With validation"\n        validation={[\n          \'email\',\n          value => value && value.length > 10,\n        ]}\n        style={{\n          maxWidth: 300,\n        }}\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/text-field/other.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:'import React from \'react\';\nimport { TextField } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <TextField\n        placeholder="Planet name"\n        color="black"\n        textColor="white"\n        style={{\n          maxWidth: 300,\n          marginBottom: 10,\n        }}\n      />\n      <TextField\n        placeholder="Planet name"\n        colorFocus="secondary"\n        style={{\n          maxWidth: 300,\n          marginBottom: 10,\n        }}\n      />\n      <TextField\n        placeholder="Planet name"\n        bgType="stroke"\n        color="black"\n        textColor="secondary"\n        colorFocus="secondary"\n        style={{\n          maxWidth: 300,\n        }}\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/text-field/customized.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| autoComplete | string | undefined | This property helps users to fill forms faster, especially on mobile devices. The name can be confusing, as it's more like an autofill. |\n| autoFocus | bool | false | If true, the input will be focused during the first mount. |\n| bgType | enum: 'fill' &#124;<br> 'stroke'<br> | 'fill' | Component type one of `fill` or `stroke`. If `fill` - component will be have background-color from `color` props. If `stroke` - component will be have border-color from `color` props. |\n| children | node | null |  |\n| className | string | '' | The CSS class name of the wrapper element. |\n| color | string | 'light_grey' | Component color from theme |\n| colorError | string | 'wrong' | Component error color from the theme. |\n| colorFocus | string | 'primary' | Component focus color from the theme. |\n| defaultValue | union: string &#124;<br> number<br> | undefined | The default input value, useful when not controlling the component. |\n| disabled | bool | false | If true, the input will be disabled. |\n| inputProps | union: object<br> | {} | Properties applied to the input element. |\n| mobileSize | enum: 'medium' &#124;<br> 'large'<br> | undefined | Component size for mobile. |\n| multiLine | bool | false | If true, a textarea element will be rendered. |\n| name | string | undefined | Name attribute of the input element. |\n| onChange | func | function() {} | Callback fired when the value is changed. |\n| onChangeType | func | function() {} | Callback fired when field type changed. |\n| onEnterPress | func | function() {} | Callback fired when pressed enter key. |\n| onKeyUp | func | function() {} | Callback fired when key up. |\n| placeholder | string | undefined | The short hint displayed in the input before the user enters a value. |\n| placeholderColor | string | 'grey_4' | Color for placeholder |\n| required | bool | false | If true, the input will be required. |\n| size | enum: 'medium' &#124;<br> 'large'<br> | 'medium' | Component size. |\n| tabIndex | number | 0 |  |\n| textColor | string | 'black' | Component text color from theme |\n| type | enum: 'text', 'password', 'email', 'tel', 'date'<br> | 'text' | Type of the input element. |\n| valid | bool | undefined | If false, the input will be unvalid styles. |\n| validation | validationPropType | undefined | Array with validation types. |\n| value | union: string &#124;<br> number<br> | undefined | The input value, required for a controlled component. |\n"]}}]);
//# sourceMappingURL=sources-demos-text-field-index-md.45b558b7.chunk.js.map