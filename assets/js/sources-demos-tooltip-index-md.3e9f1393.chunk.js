(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{151:function(n,t){n.exports=["# Tooltip\n\n## Basic\n\n",{type:"demo",data:"import React, { Fragment } from 'react';\nimport { Button, Tooltip } from 'lib-react-components';\n\nexport default function Usage() {\n  return (\n    <Fragment>\n      <Tooltip\n        content={\n          <p>\n            Tooltip content\n          </p>\n        }\n        style={{\n          display: 'inline-block',\n          marginRight: 10,\n        }}\n      >\n        <Button>\n          Hover me\n        </Button>\n      </Tooltip>\n      <Tooltip\n        action=\"click\"\n        content={\n          <p>\n            Tooltip content\n          </p>\n        }\n        style={{\n          display: 'inline-block',\n          marginRight: 10,\n        }}\n        color=\"grey\"\n        overlay\n      >\n        <Button>\n          Click me (with overlay)\n        </Button>\n      </Tooltip>\n      <Tooltip\n        action=\"focus\"\n        content={\n          <p className=\"text_white\">\n            Tooltip content\n          </p>\n        }\n        style={{\n          display: 'inline-block',\n        }}\n        color=\"black\"\n      >\n        <Button>\n          Focus me\n        </Button>\n      </Tooltip>\n    </Fragment>\n  );\n}\n",options:{demo:"/demos/tooltip/basic.jsx",showCode:"true"}},"\n\n## Placement\n\n",{type:"demo",data:"import React, { Fragment, Component } from 'react';\nimport { Button, Tooltip, Select } from 'lib-react-components';\n\nconst options = [\n  'auto-start',\n  'auto',\n  'auto-end',\n  'top-start',\n  'top',\n  'top-end',\n  'right-start',\n  'right',\n  'right-end',\n  'bottom-end',\n  'bottom',\n  'bottom-start',\n  'left-end',\n  'left',\n  'left-start',\n];\n\nexport default class Usage extends Component {\n  state = {\n    placement: options[0],\n  };\n\n  render() {\n    const { placement } = this.state;\n\n    return (\n      <Fragment>\n        <Select\n          style={{\n            maxWidth: 300,\n            marginBottom: 40,\n          }}\n          native\n          onChange={(e, value) => {\n            this.setState({\n              placement: value,\n            });\n          }}\n        >\n          {options.map(opt => (\n            <option\n              key={opt}\n              value={opt}\n            >\n              {opt}\n            </option>\n          ))}\n        </Select>\n        <Tooltip\n          placement={placement}\n          content={\n            <p>\n              Tooltip content\n            </p>\n          }\n          style={{\n            width: 100,\n            margin: '0 auto',\n          }}\n        >\n          <Button>\n            Hover me\n          </Button>\n        </Tooltip>\n      </Fragment>\n    );\n  }\n}\n",options:{demo:"/demos/tooltip/placement.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| children\xa0* | element | \xa0 | Tooltip reference element. |\n| content\xa0* | node | \xa0 | This is what will be displayed inside the tooltip. |\n| action | enum: 'click' &#124;<br> 'hover' &#124;<br> 'focus' &#124;<br> 'none'<br> | 'hover' | Which action cause tooltip shown. |\n| arrow | bool | true | If `true`, the tooltip arrow is shown. |\n| placement | enum: 'auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'<br> | 'auto' | Tooltip placement. |\n| positionFixed | bool | true | Set this to `true` if you want popper to position it self in `fixed` mode. |\n| component | string | 'div' | Parent component for tooltip and reference element. |\n| offset | number | 10 | Padding from tooltip to reference element in `px`. |\n| open | bool | \xa0 | If `true`, the tooltip is shown. |\n| onClose | func | function() { } | Callback fired when the tooltip requests to be closed (works only with `open` prop). |\n| autoHideDuration | number | 0 | The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Tooltip. This behavior is disabled by default with the null value. |\n| color | string | 'white' | Color for tooltip component. |\n| zIndex | number | 1 | Z-index for tooltip component. |\n| overlay | bool | false | If `true`, the tooltip overlay will show for opened tooltip. |\n| overlayColor | string | 'black' | Color for tooltip overlay background. |\n| overlayOpacity | number | 0.3 | Opacity for tooltip overlay. |\n| overlayZIndex | number | 0 | Z-index for tooltip overlay. |\n| overlayProps | union: object<br> | {} | HTML props for tooltip overlay. |\n| usePortal | union: bool &#124;<br> instanceOf<br> | false | Use React portal for render tooltip to another elemenet. |\n| preventOverflow | bool | true | Use preventOverflow for prevent overflow on tooltip. |\n| preventFlip | bool | false | Use preventFlip for prevent flipping tooltip, when no space. |\n| classNameTooltip | string | '' | Class name for tooltip popper root element |\n| classNameTooltipContent | string | '' | Class name for tooltip popper content element |\n| showDelay | number | 0 | The number of milliseconds to wait before showing the tooltip. |\n| flipBoundaryElement | union: string &#124;<br> instanceOf<br> | 'viewport' | Flip boundary element modifier |\n","\n\n## Props TooltipPopper\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| children\xa0* | node | \xa0 | This is what will be displayed inside the popper. |\n| arrow | bool | true | If `true`, the popper arrow is shown. |\n| referenceElement\xa0* | {clientHeight?: number, clientWidth?: number, getBoundingClientRect?: func} | \xa0 | The `referenceObject` is an object that provides an interface compatible with Popper.js and lets you use it as replacement of a real DOM node. |\n| open | bool | false | If `true`, the popper is shown. |\n| placement | enum: 'auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'<br> | 'auto' | Popper placement. |\n| positionFixed | bool | true | Set this to `true` if you want popper to position it self in `fixed` mode. |\n| offset | number | 10 | Padding from popper to `referenceElement` in `px`. |\n| color | string | 'white' | Color for tooltip component. |\n| zIndex | number | 1 | Z-index for tooltip component. |\n| usePortal | union: bool &#124;<br> instanceOf<br> | false | Use React portal for render tooltip to another elemenet. |\n| preventOverflow | bool | true | Use preventOverflow for prevent overflow on tooltip. |\n| preventFlip | bool | false | Use preventFlip for prevent flipping tooltip, when no space. |\n| classNameTooltip | string | '' | Class name for tooltip popper root element |\n| classNameTooltipContent | string | '' | Class name for tooltip popper content element |\n| showDelay | number | 0 | The number of milliseconds to wait before showing the tooltip. |\n| flipBoundaryElement | union: string &#124;<br> instanceOf<br> | 'viewport' | Flip boundary element modifier |\n"]}}]);
//# sourceMappingURL=sources-demos-tooltip-index-md.3e9f1393.chunk.js.map