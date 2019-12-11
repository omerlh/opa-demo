import React from "react";
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";

export default class CodeHighlight extends React.Component {

    componentDidMount() {
      }
    render() {
      return (
<CodeSurfer>

```js
console.log(1);
console.log(2);
console.log(3);
```

</CodeSurfer>
      )
    }
}