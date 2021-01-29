(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{73:function(n,e){n.exports=["# Box\n\n## Fill\n\n",{type:"demo",data:"import React from 'react';\nimport { Box } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <React.Fragment>\n      <Box\n        fill=\"primary\"\n        style={{\n          width: 100,\n          height: 100,\n          display: 'inline-block',\n          marginRight: 10,\n        }}\n      />\n      <Box\n        fill=\"primary\"\n        fillOpacity={0.5}\n        style={{\n          width: 100,\n          height: 100,\n          display: 'inline-block',\n          marginRight: 10,\n        }}\n      />\n      <Box\n        fill=\"primary\"\n        fillOpacity={0.1}\n        style={{\n          width: 100,\n          height: 100,\n          display: 'inline-block',\n        }}\n      />\n    </React.Fragment>\n  );\n}\n",options:{demo:"/demos/box/fill.jsx",showCode:"true"}},"\n\n## Stroke\n\n",{type:"demo",data:"import React from 'react';\nimport { Box } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <React.Fragment>\n      <Box\n        stroke=\"primary\"\n        style={{\n          width: 100,\n          height: 100,\n          display: 'inline-block',\n          marginRight: 10,\n        }}\n      />\n      <Box\n        stroke=\"primary\"\n        strokeOpacity={0.5}\n        style={{\n          width: 100,\n          height: 100,\n          display: 'inline-block',\n          marginRight: 10,\n        }}\n      />\n      <Box\n        stroke=\"primary\"\n        strokeOpacity={0.1}\n        style={{\n          width: 100,\n          height: 100,\n          display: 'inline-block',\n        }}\n      />\n    </React.Fragment>\n  );\n}\n",options:{demo:"/demos/box/stroke.jsx",showCode:"true"}},"\n\n## Stroke type\n\n",{type:"demo",data:'import React from \'react\';\nimport { Box } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <React.Fragment>\n      <Box\n        stroke="primary"\n        strokeType="left"\n        style={{\n          width: 100,\n          height: 100,\n          display: \'inline-block\',\n          marginRight: 10,\n        }}\n      />\n      <Box\n        stroke="primary"\n        strokeType="right"\n        style={{\n          width: 100,\n          height: 100,\n          display: \'inline-block\',\n          marginRight: 10,\n        }}\n      />\n      <Box\n        stroke="primary"\n        strokeType="top"\n        style={{\n          width: 100,\n          height: 100,\n          display: \'inline-block\',\n          marginRight: 10,\n        }}\n      />\n      <Box\n        stroke="primary"\n        strokeType="bottom"\n        style={{\n          width: 100,\n          height: 100,\n          display: \'inline-block\',\n          marginRight: 10,\n        }}\n      />\n    </React.Fragment>\n  );\n}\n',options:{demo:"/demos/box/stroke_type.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| borderRadius | number | undefined | Component border-radius in pixels. |\n| children | node | null | This is what will be displayed inside the component. |\n| className | string | undefined | The CSS class name of the root element. |\n| fill | string | undefined | Component background-color from theme. |\n| fillOpacity | number | undefined | Component background-color opacity. |\n| stroke | string | undefined | Component border-color from theme. |\n| strokeOpacity | number | undefined | Component border-color opacity. |\n| strokeStyle | enum: 'solid' &#124;<br> 'dashed' &#124;<br> 'dotted' &#124;<br> 'none'<br> | 'solid' | Component border style. |\n| strokeType | enum: 'horizontal', 'vertical', 'top', 'right', 'bottom', 'left'<br> | undefined | Component border position. |\n| strokeWidth | number | 1 | Component border width. |\n| tagType | string | 'div' | The component used for the root node. Either a string to use a DOM element. |\n"]}}]);
//# sourceMappingURL=sources-demos-box-index-md.9d7322ee.chunk.js.map