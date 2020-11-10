(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{106:function(n,e){n.exports=["# Linear progress\n\n## Sizes\n\n",{type:"demo",data:"import React from 'react';\nimport { LinearProgress } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <div>\n      <LinearProgress\n        style={{\n          marginBottom: 20,\n        }}\n        value={25}\n      />\n      <LinearProgress\n        style={{\n          marginBottom: 20,\n        }}\n        value={50}\n      />\n      <LinearProgress\n        value={100}\n      />\n    </div>\n  );\n}\n",options:{demo:"/demos/linear-progress/sizes.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:'import React from \'react\';\nimport { LinearProgress } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <LinearProgress\n        style={{\n          marginBottom: 20,\n        }}\n        value={25}\n        colorProgress="secondary"\n      />\n      <LinearProgress\n        style={{\n          marginBottom: 20,\n        }}\n        value={50}\n        color="black"\n        colorProgress="primary"\n      />\n      <LinearProgress\n        value={70}\n        color="success"\n        colorProgress="wrong"\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/linear-progress/customized.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| color | string | 'light_grey' | Progress line color from theme |\n| colorProgress | string | 'primary' | Background line color from theme |\n| value | valueInRangePropType | 0 | Current progress value |\n| className | string | '' | The CSS class name of the root element |\n"]}}]);
//# sourceMappingURL=sources-demos-linear-progress-index-md.e4695998.chunk.js.map