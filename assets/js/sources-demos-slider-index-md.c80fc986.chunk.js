(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{124:function(n,e){n.exports=["# Slider\n\n## Basic\n\n",{type:"demo",data:"import React from 'react';\nimport { Slider } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Slider\n        style={{\n          marginBottom: 20,\n        }}\n      />\n      <Slider\n        style={{\n          marginBottom: 20,\n        }}\n        defaultValue={0.3}\n      />\n      <Slider\n        step={0.2}\n        style={{\n          marginBottom: 20,\n        }}\n        defaultValue={0.6}\n      />\n      <Slider\n        disabled\n        defaultValue={0.8}\n      />\n    </div>\n  );\n}\n",options:{demo:"/demos/slider/basic.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:'import React from \'react\';\nimport { Slider } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Slider\n        style={{\n          marginBottom: 20,\n        }}\n        iconColor="black"\n      />\n      <Slider\n        style={{\n          marginBottom: 20,\n        }}\n        defaultValue={0.3}\n        color="wrong"\n      />\n      <Slider\n        step={0.2}\n        defaultValue={0.6}\n        color="success"\n        iconColor="success"\n        progressColor="black"\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/slider/customized.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| className | string | '' | The css class name of the root element |\n| color | string | 'light_grey' | Component color from theme |\n| defaultValue | valueInRangePropType | 0 | The default value of the slider |\n| disabled | bool | false | If true, the slider will not be interactable |\n| iconColor | string | 'primary' | Component icon color from theme |\n| inputProps | union: object<br> | {} | Properties for `<input type=\"hidden\" />` element |\n| max | minMaxPropType | 1 | The maximum value the slider can slide to on a scale from 0 to 1 inclusive. Cannot be equal to min |\n| min | minMaxPropType | 0 | The minimum value the slider can slide to on a scale from 0 to 1 inclusive. Cannot be equal to max |\n| name | string | undefined | The name of the slider. Behaves like the name attribute of an input element |\n| onChange | func | function() {} | Callback function that is fired when the slider's value changed |\n| onDragStart | func | function() {} | Callback function that is fired when the slider has begun to move |\n| onDragStop | func | function() {} | Callback function that is fired when the slider has stopped moving |\n| onMouseDown | func | function() {} | Callback function that is fired when the slider mouse down |\n| onTouchStart | func | function() {} | Callback function that is fired when the slider touch start |\n| progressColor | string | '' | Component progress color from theme |\n| required | bool | false | Whether or not the slider is required in a form |\n| step | number | 0.01 | The granularity the slider can step through values |\n| tabIndex | number | 0 | The tabIndex attribute for slider |\n| value | valueInRangePropType | undefined | The value of the slider |\n"]}}]);
//# sourceMappingURL=sources-demos-slider-index-md.c80fc986.chunk.js.map