(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{97:function(n,t){n.exports=["# Button\n\n## Types\n\n",{type:"demo",data:'import React from \'react\';\nimport { Button } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <React.Fragment>\n      <Button\n        style={{\n          marginRight: 10,\n        }}\n        bgType="stroke"\n        textColor="primary"\n      >\n        Stroke\n      </Button>\n      <Button\n        bgType="stroke"\n        textColor="primary"\n        disabled\n        style={{\n          marginRight: 10,\n        }}\n      >\n        Stroke\n      </Button>\n      <Button\n        style={{\n          marginRight: 10,\n        }}\n      >\n        Fill\n      </Button>\n      <Button\n        disabled\n        style={{\n          marginRight: 10,\n        }}\n      >\n        Fill\n      </Button>\n      <Button\n        style={{\n          marginRight: 10,\n        }}\n        bgType="clear"\n        textColor="primary"\n      >\n        Clear\n      </Button>\n      <Button\n        disabled\n        bgType="clear"\n        textColor="primary"\n      >\n        Clear\n      </Button>\n    </React.Fragment>\n  );\n}\n\n',options:{demo:"/demos/button/types.jsx",showCode:"true"}},"\n\n## Sizes\n\n",{type:"demo",data:"import React from 'react';\nimport { Button } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Button\n        size=\"small\"\n        style={{\n          marginRight: 10,\n        }}\n      >\n        Small\n      </Button>\n      <Button\n        style={{\n          marginRight: 10,\n        }}\n      >\n        Medium\n      </Button>\n      <Button size=\"large\">\n        Large\n      </Button>\n      <br />\n      <br />\n      <Button full>\n        Full\n      </Button>\n    </div>\n  );\n}\n",options:{demo:"/demos/button/sizes.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:'import React from \'react\';\nimport { Button } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Button\n        style={{\n          marginRight: 10,\n        }}\n        color="secondary"\n      >\n        Fill secondary\n      </Button>\n      <Button\n        bgType="stroke"\n        color="wrong"\n        textColor="wrong"\n      >\n        Stroke wrong\n      </Button>\n    </div>\n  );\n}\n',options:{demo:"/demos/button/customized.jsx",showCode:"true"}},"\n\n## Custom element\n\n",{type:"demo",data:'import React from \'react\';\nimport { Button } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Button\n        component={props => <label {...props} />}\n        style={{\n          marginRight: 10,\n        }}\n      >\n        Choose file\n        <input\n          type="file"\n          style={{\n            height: 0,\n            width: 0,\n            overflow: \'hidden\',\n          }}\n        />\n      </Button>\n      <Button\n        component={props => <a href="/" {...props} />}\n        style={{\n          marginRight: 10,\n        }}\n        bgType="stroke"\n        textColor="primary"\n      >\n        Link\n      </Button>\n    </div>\n  );\n}\n',options:{demo:"/demos/button/custom_element.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| align | enum: 'left' &#124;<br> 'center' &#124;<br> 'right'<br> | 'center' | Component content aligment |\n| bgType | enum: 'fill' &#124;<br> 'stroke' &#124;<br> 'clear'<br> | 'fill' | Component type one of `fill` or `stroke`. If `fill` - component will have background and border from `color` props. If `stroke` - component will have border from `color` props and transparent background. If `clear` - component will have transparent border and transparent background. |\n| children\xa0* | node | \xa0 | This is what will be displayed inside the button |\n| className | string | '' | The CSS class name of the root element |\n| color | string | 'primary' | Component color from theme |\n| component | func | undefined | The function component for render custom element |\n| componentRef | union: func &#124;<br> {current?: any}<br> | undefined | Component ref. |\n| disabled | bool | false | Disables the button if set to true |\n| full | bool | false | Component full-width. |\n| href | string | undefined | The URL to link to when the button is clicked |\n| onClick | func | null | Callback function fired when the button is clicked |\n| size | enum: 'small' &#124;<br> 'medium' &#124;<br> 'large'<br> | 'medium' | Component size |\n| textColor | string | 'white' | Component text color from theme |\n"]}}]);
//# sourceMappingURL=sources-demos-button-index-md.c87bdb52.chunk.js.map