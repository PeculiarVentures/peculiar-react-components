(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{83:function(n,o){n.exports=["# Button Group\n\n",{type:"demo",data:"import React from 'react';\nimport { ButtonGroup, Button } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <React.Fragment>\n      <ButtonGroup>\n        <Button>\n          One\n        </Button>\n        <Button>\n          Two\n        </Button>\n        <Button disabled>\n          Three\n        </Button>\n      </ButtonGroup>\n      <br />\n      <br />\n      <ButtonGroup full>\n        <Button>\n          One\n        </Button>\n        <Button>\n          Two\n        </Button>\n        <Button disabled>\n          Three\n        </Button>\n      </ButtonGroup>\n    </React.Fragment>\n  );\n}\n",options:{demo:"/demos/button_group/basic.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| bgType | enum: 'fill' &#124;<br> 'stroke' &#124;<br> 'clear'<br> | 'fill' | Component type one of `fill` or `stroke`. If `fill` - component will have background and border from `color` props. If `stroke` - component will have border from `color` props and transparent background. If `clear` - component will have transparent border and transparent background. |\n| color | string | 'primary' | Button component color from theme |\n| textColor | string | 'white' | Button component text color from theme |\n| size | enum: 'small' &#124;<br> 'medium' &#124;<br> 'large'<br> | 'medium' | Button component size |\n| disabled | bool | false | Disables the buttons if set to true |\n| children\xa0* | node | \xa0 | This is what will be displayed inside the root element. |\n| className | string | undefined | The CSS class name of the root element. |\n| full | bool | false | Component full-width. |\n"]}}]);
//# sourceMappingURL=sources-demos-button_group-index-md.8c11adad.chunk.js.map