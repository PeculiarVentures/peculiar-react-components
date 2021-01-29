(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{129:function(n,e){n.exports=["# Portal\n\n## Basic\n\n",{type:"demo",data:"import React, { Component } from 'react';\nimport { Button, Portal, Typography } from 'lib-react-components';\n\nexport default class Usage extends Component {\n  state = {\n    show: false,\n  };\n\n  handleClick = () => {\n    this.setState({ show: !this.state.show });\n  };\n\n  container = null;\n\n  render() {\n    const { show } = this.state;\n\n    return (\n      <div>\n        <Button onClick={this.handleClick}>\n          {show ? 'UNMOUNT CHILDREN' : 'MOUNT CHILDREN'}\n        </Button>\n        <div\n          style={{\n            marginTop: 20,\n          }}\n        >\n          {show && (\n            <Portal container={this.container}>\n              <Typography\n                className=\"aui_stroke_grey\"\n              >\n                Portal childrens\n              </Typography>\n            </Portal>\n          )}\n        </div>\n        <div ref={(node) => { this.container = node; }} />\n      </div>\n    );\n  }\n}\n",options:{demo:"/demos/portal/basic.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| children\xa0* | node | \xa0 | The children to render into the `container`. |\n| container | union: object &#124;<br> func &#124;<br> instanceOf<br> | \xa0 | A node, component instance, or function that returns either. The `container` will have the portal children appended to it. By default, it uses the body of the top-level document object, so it's simply `document.body` most of the time. |\n| onRendered | func | function() {} | Callback fired once the children has been mounted into the `container`. |\n"]}}]);
//# sourceMappingURL=sources-demos-portal-index-md.0c9a7ed2.chunk.js.map