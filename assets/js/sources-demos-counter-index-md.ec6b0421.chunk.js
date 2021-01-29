(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{119:function(n,e){n.exports=["# Counter\n\n## Basic\n\n",{type:"demo",data:"import React from 'react';\nimport { Counter } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <Counter\n      minValue={0}\n      maxValue={5}\n    />\n  );\n}\n",options:{demo:"/demos/counter/basic.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:'import React from \'react\';\nimport { Counter } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Counter\n        minValue={0}\n        maxValue={5}\n        bgType="stroke"\n        color="primary"\n        textColor="primary"\n        colorFocus="success"\n        counterProps={{\n          style: {\n            marginBottom: 20,\n          },\n        }}\n      />\n      <Counter\n        minValue={0}\n        maxValue={5}\n        minValuePlaceholder="Min"\n        maxValuePlaceholder="Max"\n        color="secondary"\n        textColor="white"\n        counterProps={{\n          style: {\n            marginBottom: 20,\n          },\n        }}\n      />\n      <Counter\n        minValue={0}\n        maxValue={5}\n        color="wrong"\n        bgType="stroke"\n        textColor="secondary"\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/counter/customized.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| bgType | enum: 'fill' &#124;<br> 'stroke'<br> | 'fill' | Component type one of `fill` or `stroke`. If `fill` - component will be have background-color from `color` props. If `stroke` - component will be have border-color from `color` props. |\n| color | string | 'light_grey' | Component color from theme |\n| colorFocus | string | 'primary' | Component focus color from theme |\n| counterProps | union: object<br> | {} | Additional custom properties applied to the component. |\n| defaultValue | number | 0 | The default input value, useful when not controlling the component. |\n| disabled | bool | false | If true, the input will be disabled. |\n| inputProps | union: object<br> | {} | Properties applied to the input element. |\n| maxValue | number | undefined | Minimum input value |\n| maxValuePlaceholder | union: string &#124;<br> number<br> | undefined | Placeholder that will show if current value equal to maximum value |\n| minValue | number | undefined | Maximum input value |\n| minValuePlaceholder | union: string &#124;<br> number<br> | undefined | Placeholder that will show if current value equal to minimum value |\n| onChange | func | function() {} | Callback fired when the value is changed. |\n| textColor | string | 'black' | Component text color from theme |\n| value | number | undefined | The input value, required for a controlled component. |\n"]}}]);
//# sourceMappingURL=sources-demos-counter-index-md.ec6b0421.chunk.js.map