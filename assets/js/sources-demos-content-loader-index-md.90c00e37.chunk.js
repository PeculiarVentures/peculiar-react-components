(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{98:function(n,t){n.exports=["# Content loader\n\n## Basic\n\n",{type:"demo",data:'import React from \'react\';\nimport { ContentLoader } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <ContentLoader\n      width={500}\n      height={70}\n    >\n      <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />\n      <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />\n      <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />\n    </ContentLoader>\n  );\n}\n',options:{demo:"/demos/content-loader/basic.jsx",showCode:"true"}},"\n\n## Customized\n\n",{type:"demo",data:'import React from \'react\';\nimport { ContentLoader } from \'lib-react-components\';\n\nexport default function Usage() {\n  return (\n    <div>\n      <ContentLoader\n        width={500}\n        height={70}\n        color="primary"\n        style={{\n          marginBottom: 40,\n        }}\n      >\n        <rect x="0" y="0" rx="3" ry="3" width="70" height="10" />\n        <rect x="80" y="0" rx="3" ry="3" width="100" height="10" />\n        <rect x="190" y="0" rx="3" ry="3" width="10" height="10" />\n        <rect x="15" y="20" rx="3" ry="3" width="130" height="10" />\n        <rect x="155" y="20" rx="3" ry="3" width="130" height="10" />\n        <rect x="15" y="40" rx="3" ry="3" width="90" height="10" />\n        <rect x="115" y="40" rx="3" ry="3" width="60" height="10" />\n        <rect x="185" y="40" rx="3" ry="3" width="60" height="10" />\n        <rect x="0" y="60" rx="3" ry="3" width="30" height="10" />\n      </ContentLoader>\n      <ContentLoader\n        width={500}\n        height={60}\n        color="secondary"\n      >\n        <circle cx="30" cy="30" r="30" />\n        <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />\n        <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />\n      </ContentLoader>\n    </div>\n  );\n}\n',options:{demo:"/demos/content-loader/customized.jsx",showCode:"true"}},"\n\n## Props\n\n","\n| Name | Type | Default | Description |\n|:-----|:-----|:--------|:------------|\n| color | string | 'grey' | Color from theme |\n| duration | number | 2 | Animation duration |\n| className | string | '' | The CSS class name of the root element |\n| height | number | 300 | Height of component in px |\n| width | number | 300 | Width of component in px |\n| children\xa0* | node | \xa0 | The content of the component |\n"]}}]);
//# sourceMappingURL=sources-demos-content-loader-index-md.90c00e37.chunk.js.map