# Draggable

This component provide an ability to visualize and modify the rectangles
Current version supports only rectangle, but it planned to supports free quadriliterals too.

## Basic

{{"demo": "/demos/draggable/basic.jsx", "showCode": "true"}}

## Customized

{{"demo": "/demos/draggable/customized.jsx", "showCode": "true"}}

## Props

 Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
rect | \[number, number, number, number] | - | Initial rectangle
containerSizes | \[number, number] | - | \[width, height]
onChange | func | () => {} | When rect dragging released, invokes with the new rect value
onRemove | func | () => {} | Invokes when user press Delete or Backspace while editing the element
onCancel | func | () => {} | Invokes when user press Escape while editing the element
active | boolean | true | Define if element could be draggable
color | string | 'primary' | Define the element color from palette