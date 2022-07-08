import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Editor,
  EditorTools,
  EditorUtils,
  ProseMirror,
  EditorChangeEvent,
} from '@progress/kendo-react-editor';

const { Bold, Italic } = EditorTools;

const content = `<p><font color="#2980B9"><strong>Type In</strong></font>&nbsp;<font color="#D35400"><strong>MCAD Assembly&nbsp;Number</strong></font>, then <font color="#2980B9"><strong>Click</strong></font> the <font color="#D35400"><strong>Search</strong></font> icon</p>  <p>&nbsp;</p>  <p>Once complete, <font color="#2ECC71"><strong>Click the Next button</strong></font> to move forward</p>`;

const fontToSpan = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  Array.from(div.querySelectorAll('font')).forEach((font) => {
    const span = document.createElement('span');
    span.style.color = font.color;
    font.parentNode.insertBefore(span, font);
    while (font.firstChild) {
      span.appendChild(font.firstChild);
    }
    font.parentNode.removeChild(font);
  });
  return div.innerHTML;
};

const App = () => {
  const [value, setValue] = React.useState(
    EditorUtils.createDocument(
      new ProseMirror.Schema({
        nodes: EditorUtils.nodes,
        marks: EditorUtils.marks,
      }),
      fontToSpan(content)
    )
  );
  const onChange = (event: EditorChangeEvent) => {
    setValue(event.value);
  };
  return (
    <Editor
      value={value}
      onChange={onChange}
      tools={[[Bold, Italic]]}
      contentStyle={{ height: 100 }}
    />
  );
};

ReactDOM.render(<App />, document.querySelector('my-app'));
