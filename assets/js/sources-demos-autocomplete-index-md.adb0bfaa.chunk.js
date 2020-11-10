(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{70:function(e,n){e.exports=["# Autocomplete\n\n## Basic\n\n",{type:"demo",data:"import React from 'react';\nimport { SelectItem, Autocomplete } from 'lib-react-components';\n\nconst options = [\n  {\n    label: 'Mercury',\n    value: 'mercury',\n  },\n  {\n    label: 'Venus',\n    value: 'venus',\n  },\n  {\n    label: 'Earth',\n    value: 'earth',\n  },\n  {\n    label: 'Mars',\n    value: 'mars',\n  },\n  {\n    label: 'Jupiter',\n    value: 'jupiter',\n  },\n  {\n    label: 'Saturn',\n    value: 'saturn',\n  },\n  {\n    label: 'Uranus',\n    value: 'uranus',\n  },\n  {\n    label: 'Neptune',\n    value: 'neptune',\n  },\n];\n\nexport default function Usage() {\n  return (\n    <Autocomplete\n      placeholder=\"Planet\"\n    >\n      {options.map(opt => (\n        <SelectItem\n          key={opt.value}\n          value={opt.value}\n        >\n          {opt.label}\n        </SelectItem>\n      ))}\n    </Autocomplete>\n  );\n}\n",options:{demo:"/demos/autocomplete/basic.jsx"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| children | node | null |  |\n| className | string | '' | The CSS class name of the wrapper element. |\n| defaultValue | union: string &#124;<br> number<br> | undefined | The default input value, useful when not controlling the component. |\n| disabled | bool | false | If true, the input will be disabled. |\n| onChange | func | function() {} | Callback fired when the value is changed. |\n| onFocus | func | function() {} |  |\n| onBlur | func | function() {} |  |\n| onKeyDown | func | function() {} |  |\n| type | enum: 'text', 'password', 'email', 'tel', 'date'<br> | 'text' | Type of the input element. |\n| value | union: string &#124;<br> number<br> | \xa0 | The input value, required for a controlled component. |\n| required | bool | false | If true, the input will be required. |\n| valid | bool | undefined | If false, the input will be unvalid styles. |\n| placeholder | string | undefined | The short hint displayed in the input before the user enters a value. |\n| placeholderColor | string | 'grey_4' | Color for placeholder |\n| name | string | undefined | Name attribute of the input element. |\n| bgType | enum: 'fill' &#124;<br> 'stroke'<br> | 'fill' | Component type one of `fill` or `stroke`. If `fill` - component will be have background-color from `color` props. If `stroke` - component will be have border-color from `color` props. |\n| color | string | 'light_grey' | Component color from theme |\n| textColor | string | 'black' | Component text color from theme |\n| colorFocus | string | 'primary' | Component focus color from theme |\n| size | enum: 'medium' &#124;<br> 'large'<br> | 'medium' | Component size. |\n| mobileSize | enum: 'medium' &#124;<br> 'large'<br> | undefined | Component size for mobile. |\n| inputProps | union: object<br> | {} | Properties applied to the input element. |\n| validation | validationPropType | undefined | Array with validation types. |\n| placement | enum: 'top' &#124;<br> 'bottom'<br> | 'bottom' | Component dropdown start opened direction. |\n| flip | bool | true | If `true`, component will automatically calc possible dropdown opened direction. |\n"]}}]);
//# sourceMappingURL=sources-demos-autocomplete-index-md.adb0bfaa.chunk.js.map