import { useInput, TextInputProps } from 'react-admin';
import { JsonEditor, Mode } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

const JsonEditorInput: React.FC<TextInputProps> = (
  props: TextInputProps
): React.ReactElement<any, any> | null => {
  const { onChange } = props;
  const {
    field: { value },
  } = useInput(props);
  return (
    <JsonEditor
      allowedModes={'tree view form code text'.split(' ') as Mode[]}
      value={JSON.parse(value || '{}')}
      onChange={(value) => onChange?.(JSON.stringify(value))}
      htmlElementProps={{ style: { height: '100%' } }}
    />
  );
};

export default JsonEditorInput;
