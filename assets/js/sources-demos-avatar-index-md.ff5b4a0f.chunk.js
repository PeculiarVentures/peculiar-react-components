(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{89:function(A,e){A.exports=["# Avatar\n\nAvatars are found throughout material design with uses in everything from tables to dialog menus.\n\n## Image\n\nImage avatars can be created by passing props `src` into the component.\n\n",{type:"demo",data:'import React from \'react\';\nimport { Avatar } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Avatar\n        style={{\n          marginRight: 10,\n        }}\n      />\n      <Avatar\n        src="data:image/jpeg;base64,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"\n        style={{\n          marginRight: 10,\n        }}\n        size={50}\n      />\n      <Avatar\n        src="error"\n        defaultSrc="data:image/jpeg;base64,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"\n        size={60}\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/avatar/image.jsx",showCode:"true"}},"\n\n## Letter\n\nAvatars containing simple characters can be created by passing your string as `letters`.\n\n",{type:"demo",data:'import React from \'react\';\nimport { Avatar } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <Avatar\n        letters="Admin"\n        style={{\n          marginRight: 10,\n        }}\n      />\n      <Avatar\n        letters="User"\n        color="secondary"\n        style={{\n          marginRight: 10,\n        }}\n        size={50}\n      />\n      <Avatar\n        letters="Custom"\n        bgType="stroke"\n        color="wrong"\n        textColor="wrong"\n        size={60}\n      />\n    </div>\n  );\n}\n',options:{demo:"/demos/avatar/letter.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| bgType | enum: 'fill' &#124;<br> 'stroke'<br> | 'fill' | Component type one of `fill` or `stroke`. If `fill` - component will be have background-color from `color` props. If `stroke` - component will be have border-color from `color` props. |\n| className | string | '' | The css class name of the root div or img element |\n| color | string | 'light_grey' | Component color from theme |\n| defaultSrc | string | 'data:image/png;base64,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' | If `src` passed and image not loaded - the image src will defaultSrc |\n| letters | string | '' | Can be used, for instance, to render a letter inside the avatar |\n| size | number | 40 | This is the size of the avatar in pixels |\n| src | string | '' | If passed in, this component will render an img element. Otherwise, a div will be rendered |\n| style | union: object<br> | {} | Override the inline-styles of the root element |\n| textColor | string | 'primary' | Component text color from theme |\n"]}}]);
//# sourceMappingURL=sources-demos-avatar-index-md.ff5b4a0f.chunk.js.map