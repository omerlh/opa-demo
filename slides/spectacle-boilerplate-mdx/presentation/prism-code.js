import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import styled from 'styled-components';
import {Anim} from 'spectacle';

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`

function shouldHighlightLine(lineNumber) {
    console.log(lineNumber);
    return lineNumber == 5;
}

export default class PrismCode extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  render() {
    const { code, language } = this.props
    return (
        <Highlight {...defaultProps} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{textAlign: "left", padding: "20px", height: "600px", overflow: "scroll", wordBreak: "break-all", wordWrap: "break-word", ...style}}>
            {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                if (shouldHighlightLine(i)) {
                    console.log("hello")
                  lineProps.className = `${lineProps.className} highlight-line`;
                  return  (
                      <Anim fromStyle={lineProps.style} toStyle={[{"backgroundColor":"green","color":"#9a86fd"}]}>
                    <div {...lineProps} >
                      <LineNo>{i + 1}</LineNo>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                    </Anim>
                    )
                } 
                else  {
                return  (
              <div {...lineProps} >
                <LineNo>{i + 1}</LineNo>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>) }
            }
            )}
          </pre>
        )}
      </Highlight>
    )
  }
}