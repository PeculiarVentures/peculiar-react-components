(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{91:function(n,e){n.exports=["# Checkbox\n\n## Stroke\n\n",{type:"demo",data:'import React from \'react\';\nimport { Checkbox } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div style={{ textAlign: \'center\' }}>\n      <Checkbox\n        bgType="stroke"\n        iconColorOn="primary"\n        style={{\n          marginRight: 10,\n        }}\n      />\n      <Checkbox\n        bgType="stroke"\n        iconColorOn="primary"\n        defaultChecked\n        iconType="square"\n        style={{\n          marginRight: 10,\n        }}\n      />\n      <Checkbox\n        bgType="stroke"\n        iconColorOn="primary"\n        disabled\n        style={{\n          marginRight: 10,\n        }}\n      />\n      <Checkbox\n        bgType="stroke"\n        iconColorOn="primary"\n        disabled\n        defaultChecked\n      />\n    </div>\n  );\n}\n\n',options:{demo:"/demos/checkbox/stroke.jsx",showCode:"true"}},"\n\n## Fill\n\n",{type:"demo",data:"import React from 'react';\nimport { Checkbox } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <div style={{ textAlign: 'center' }}>\n      <Checkbox\n        style={{\n          marginRight: 10,\n        }}\n      />\n      <Checkbox\n        defaultChecked\n        iconType=\"square\"\n        style={{\n          marginRight: 10,\n        }}\n      />\n      <Checkbox\n        disabled\n        style={{\n          marginRight: 10,\n        }}\n      />\n      <Checkbox\n        disabled\n        defaultChecked\n      />\n    </div>\n  );\n}\n",options:{demo:"/demos/checkbox/fill.jsx",showCode:"true"}},"\n\n## With label\n\n",{type:"demo",data:'import React from \'react\';\nimport { Checkbox } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Checkbox\n        bgType="stroke"\n        iconColorOn="primary"\n        style={{\n          marginBottom: 10,\n        }}\n        label="I am label left"\n      />\n      <br />\n      <Checkbox\n        bgType="stroke"\n        iconColorOn="primary"\n        defaultChecked\n        label="I am label right"\n        labelPosition="right"\n      />\n    </div>\n  );\n}\n\n',options:{demo:"/demos/checkbox/label.jsx",showCode:"true"}},"\n\n## Controlled\n\n",{type:"demo",data:"import React, { Component } from 'react';\nimport { Checkbox } from 'lib-react-components';\n\nexport default class Usage extends Component {\n  state = {\n    mercury: false,\n    venus: false,\n    earth: true,\n  };\n\n  handleChange = name => (event, checked) => {\n    this.setState({\n      [name]: checked,\n    });\n  };\n\n  render() {\n    const {\n      mercury,\n      venus,\n      earth,\n    } = this.state;\n\n    return (\n      <div style={{ textAlign: 'center' }}>\n        <Checkbox\n          style={{\n            marginRight: 10,\n          }}\n          name=\"mercury\"\n          checked={mercury}\n          onCheck={this.handleChange('mercury')}\n        />\n        <Checkbox\n          style={{\n            marginRight: 10,\n          }}\n          name=\"venus\"\n          checked={venus}\n          onCheck={this.handleChange('venus')}\n        />\n        <Checkbox\n          name=\"earth\"\n          checked={earth}\n          onCheck={this.handleChange('earth')}\n        />\n      </div>\n    );\n  }\n}\n",options:{demo:"/demos/checkbox/controlled.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:'import React from \'react\';\nimport { Checkbox } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div style={{ textAlign: \'center\' }}>\n      <Checkbox\n        style={{\n          marginRight: 10,\n        }}\n        color="black"\n      />\n      <Checkbox\n        defaultChecked\n        style={{\n          marginRight: 10,\n        }}\n        colorOn="wrong"\n      />\n      <Checkbox\n        defaultChecked\n        iconColorOn="black"\n        bgType="fill"\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/checkbox/customized.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| bgType | enum: 'fill' &#124;<br> 'stroke'<br> | 'fill' | Component type one of `fill` or `stroke`. If `fill` - component will be have background-color from `color` props. If `stroke` - component will be have border-color from `color` props. |\n| checked | bool | \xa0 | Toggled if set to true |\n| className | string | '' | The CSS class name of the root element |\n| color | string | 'light_grey' | Component color from theme |\n| colorOn | string | 'primary' | Component checked color from theme |\n| defaultChecked | bool | false | Initial state for input |\n| disabled | bool | false | Will disable the toggle if true |\n| iconColor | string | 'grey' | Component icon color from theme |\n| iconColorOn | string | 'white' | Component checked icon color from theme |\n| inputProps | union: object<br> | {} | Properties for `<input type=\"checkbox\" />` element |\n| label | union: string &#124;<br> number<br> | undefined | Label for toggle |\n| labelPosition | enum: 'left' &#124;<br> 'right'<br> | 'left' | Where the label will be placed next to the toggle |\n| labelProps | object | {} | `Typography` props for label |\n| name | string | undefined | Name attribute for input tag |\n| onCheck | func | \xa0 | Callback function that is fired when the toggle switch is toggled |\n| tabIndex | number | 0 | The tabIndex of the root element |\n"]}}]);
//# sourceMappingURL=sources-demos-checkbox-index-md.20e36441.chunk.js.map