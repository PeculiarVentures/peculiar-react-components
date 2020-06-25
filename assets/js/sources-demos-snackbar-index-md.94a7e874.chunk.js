(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{129:function(n,e){n.exports=["# Snackbar\n\n## Basic\n\n",{type:"demo",data:'import React, { Component } from \'react\';\nimport { Button, Snackbar } from \'lib-react-components\';\n\nexport default class Usage extends Component {\n  state = {\n    open: false,\n  };\n\n  handleOpen = () => {\n    this.setState({\n      open: true,\n    });\n  }\n\n  handleClose = () => {\n    this.setState({\n      open: false,\n    });\n  };\n\n  render() {\n    const { open } = this.state;\n\n    return (\n      <div>\n        <Button onClick={this.handleOpen}>\n          Open\n        </Button>\n        <Snackbar\n          autoHideDuration={4000}\n          onClose={this.handleClose}\n          open={open}\n          action={[\n            <Button\n              size="small"\n              key="0"\n              onClick={this.handleClose}\n              bgType="stroke"\n              color="success"\n              textColor="white"\n            >\n              Close\n            </Button>,\n          ]}\n        >\n          I love candy. I love cookies. I love cupcakes.\n        </Snackbar>\n      </div>\n    );\n  }\n}\n',options:{demo:"/demos/snackbar/basic.jsx",showCode:"true"}},"\n\n## Position\n\n",{type:"demo",data:"import React, { Component } from 'react';\nimport { Button, Snackbar } from 'lib-react-components';\n\nexport default class Usage extends Component {\n  state = {\n    open: false,\n    verticalPosition: 'bottom',\n  };\n\n  handleOpen(verticalPosition) {\n    this.setState({\n      open: true,\n      verticalPosition,\n    });\n  }\n\n  handleClose = () => {\n    this.setState({\n      open: false,\n    });\n  };\n\n  render() {\n    return (\n      <div>\n        <Button onClick={() => this.handleOpen('top')}>\n          Top position\n        </Button>\n        <br />\n        <br />\n        <Button onClick={() => this.handleOpen('bottom')}>\n          Bottom position\n        </Button>\n        <Snackbar\n          autoHideDuration={4000}\n          onClose={this.handleClose}\n          {...this.state}\n          action={[\n            <Button\n              size=\"small\"\n              key=\"0\"\n              onClick={this.handleClose}\n              bgType=\"stroke\"\n              color=\"success\"\n              textColor=\"white\"\n            >\n              Close\n            </Button>,\n          ]}\n        >\n          I love candy. I love cookies. I love cupcakes.\n        </Snackbar>\n      </div>\n    );\n  }\n}\n",options:{demo:"/demos/snackbar/position.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:'import React, { Component } from \'react\';\nimport { Button, Snackbar } from \'lib-react-components\';\n\nexport default class Usage extends Component {\n  state = {\n    open: false,\n  };\n\n  handleOpen = () => {\n    this.setState({\n      open: true,\n    });\n  }\n\n  handleClose = () => {\n    this.setState({\n      open: false,\n    });\n  };\n\n  render() {\n    const { open } = this.state;\n\n    return (\n      <div>\n        <Button onClick={this.handleOpen}>\n          Open\n        </Button>\n        <Snackbar\n          color="primary"\n          textColor="black"\n          autoHideDuration={4000}\n          onClose={this.handleClose}\n          open={open}\n          action={[\n            <Button\n              size="small"\n              key="0"\n              onClick={this.handleClose}\n              bgType="stroke"\n              color="white"\n              textColor="white"\n            >\n              Close\n            </Button>,\n          ]}\n        >\n          I love candy. I love cookies. I love cupcakes.\n        </Snackbar>\n      </div>\n    );\n  }\n}\n',options:{demo:"/demos/snackbar/customized.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| autoHideDuration | number | undefined | The number of milliseconds to wait before automatically calling the onClose function. onClose should then set the state of the open prop to hide the Snackbar. This behavior is disabled by default with the null value. |\n| children\xa0* | node | \xa0 | This is what will be displayed inside the Snackbar. |\n| className | string | undefined | The CSS class name of the root element. |\n| onClose | func | function() {} | Callback fired when the component requests to be closed. |\n| onMouseLeave | func | function() {} | Callback function fired when the component mouse leave. |\n| onMouseEnter | func | function() {} | Callback function fired when the component mouse enter. |\n| open | bool | false | If true, Snackbar is open. |\n| fullWidth | bool | true | If true, Snackbar has `width: 100%`. |\n| verticalPosition | enum: 'top' &#124;<br> 'bottom'<br> | 'bottom' | Vertical position for Snackbar. |\n| horizontalPosition | enum: 'left' &#124;<br> 'center' &#124;<br> 'right'<br> | 'left' | Horizontal position for Snackbar. |\n| action | node | null | The action to display. |\n| color | string | 'black' | Component color from theme. |\n| textColor | string | 'white' | Component text color from theme. |\n"]}}]);
//# sourceMappingURL=sources-demos-snackbar-index-md.94a7e874.chunk.js.map