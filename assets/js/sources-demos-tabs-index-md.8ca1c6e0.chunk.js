(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{160:function(n,e){n.exports=["# Tabs\n\n## Basic\n\n",{type:"demo",data:"import React from 'react';\nimport { Tabs, Tab } from 'lib-react-components';\n\nconst tabs = [\n  {\n    value: 'one',\n    label: 'Item one',\n  },\n  {\n    value: 'two',\n    label: 'Item two',\n  },\n  {\n    value: 'three',\n    label: 'Disabled',\n    disabled: true,\n  },\n];\n\nexport default function Usage() {\n  return (\n    <div>\n      <Tabs\n        defaultValue=\"one\"\n      >\n        {tabs.map(t => (\n          <Tab\n            key={t.value}\n            value={t.value}\n            disabled={t.disabled}\n          >\n            {t.label}\n          </Tab>\n        ))}\n      </Tabs>\n    </div>\n  );\n}\n",options:{demo:"/demos/tabs/basic.jsx",showCode:"true"}},"\n\n## Controlled\n\n",{type:"demo",data:"import React, { Component } from 'react';\nimport { Tabs, Tab } from 'lib-react-components';\n\nconst tabs = [\n  {\n    value: 'one',\n    label: 'Item one',\n  },\n  {\n    value: 'two',\n    label: 'Item two',\n  },\n  {\n    value: 'three',\n    label: 'Item three',\n  },\n];\n\nexport default class Usage extends Component {\n  state = {\n    value: 'one',\n  };\n\n  render() {\n    const { value } = this.state;\n\n    return (\n      <div>\n        <Tabs\n          value={value}\n          onChange={(e, val) => this.setState({ value: val })}\n        >\n          {tabs.map(t => (\n            <Tab\n              key={t.value}\n              value={t.value}\n              disabled={t.disabled}\n            >\n              {t.label}\n            </Tab>\n          ))}\n        </Tabs>\n      </div>\n    );\n  }\n}\n",options:{demo:"/demos/tabs/controlled.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:"import React from 'react';\nimport { Tabs, Tab } from 'lib-react-components';\n\nconst tabs = [\n  {\n    value: 'one',\n    label: 'Item one',\n  },\n  {\n    value: 'two',\n    label: 'Item two',\n  },\n  {\n    value: 'three',\n    label: 'Disabled',\n    disabled: true,\n  },\n];\n\nexport default function Usage() {\n  return (\n    <div>\n      <Tabs\n        defaultValue=\"one\"\n        color=\"black\"\n        colorOn=\"success\"\n      >\n        {tabs.map(t => (\n          <Tab\n            key={t.value}\n            value={t.value}\n            disabled={t.disabled}\n          >\n            {t.label}\n          </Tab>\n        ))}\n      </Tabs>\n    </div>\n  );\n}\n",options:{demo:"/demos/tabs/customized.jsx",showCode:"true"}},"\n\n## Custom element\n\n",{type:"demo",data:"import React from 'react';\nimport { Tabs, Tab } from 'lib-react-components';\n\nconst tabs = [\n  {\n    value: 'one',\n    label: 'Item one',\n  },\n  {\n    value: 'two',\n    label: 'Item two',\n  },\n  {\n    value: 'three',\n    label: 'Disabled',\n    disabled: true,\n  },\n];\n\nexport default function Usage() {\n  return (\n    <div>\n      <Tabs\n        defaultValue=\"one\"\n      >\n        {tabs.map(t => (\n          <Tab\n            key={t.value}\n            value={t.value}\n            disabled={t.disabled}\n            component={props => <a href=\"/\" {...props} />}\n          >\n            {t.label}\n          </Tab>\n        ))}\n      </Tabs>\n    </div>\n  );\n}\n",options:{demo:"/demos/tabs/custom_element.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| align | enum: 'left' &#124;<br> 'center' &#124;<br> 'right'<br> | 'center' | Component content aligment |\n| children\xa0* | node | \xa0 | The contents of the Tabs |\n| className | string | '' | The CSS class name of the root element |\n| color | string | 'grey' | Component color from theme |\n| colorOn | string | 'primary' | Component checked color from theme |\n| defaultValue | union: string &#124;<br> number<br> | '' | The text string to use for the default tab selected |\n| onChange | func | function() {} | Callback function that is fired when the Tabs selected value changed |\n| value | union: string &#124;<br> number<br> | '' | Makes Tabs controllable and selects the tab whose value prop matches this prop |\n","\n\n## Props Tab\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| children\xa0* | union: number &#124;<br> string &#124;<br> node<br> | \xa0 | The contents of the Tab |\n| className | string | '' | The css class name of the root element |\n| color | string | 'grey' | Component color from theme |\n| colorOn | string | 'primary' | Component checked color from theme |\n| component | func | undefined | The function component for render custom element |\n| disabled | bool | false | Disabled the Tab if set to true |\n| onClick | func | function() {} | Callback function that is fired when the Tab clicked |\n| selected | bool | false | Selected the Tab if set to true |\n| value\xa0* | union: number &#124;<br> string<br> | \xa0 | If value prop passed to Tabs component, this value prop is also required. It assigns a value to the tab so that it can be selected by the Tabs |\n"]}}]);
//# sourceMappingURL=sources-demos-tabs-index-md.8ca1c6e0.chunk.js.map