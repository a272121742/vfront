/* eslint-disable react/react-in-jsx-scope */
import { storiesOf, setAddon } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number, color, object, array, select, date, button } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import readme from './README.md';


const stories = storiesOf('button - 按钮', module);
// storiesOf('按钮', module)
//   // .addDecorator((storyFn, context) => withConsole()(storyFn)(context))

stories
  .addDecorator(withKnobs)
  .addDecorator(withReadme(readme))
  .add('i-button iView按钮', () => ({
    render () {
      const type = select('type', ['primary','ghost','dashed','text','info','success','warning','error']);
      const size = select('size', ['default', 'large', 'small']);
      const shape = select('shape', ['default','circle']);
      const long = boolean('long', false);
      const htmlType = select('html-type', ['button', 'submit', 'reset']);
      const disabled = boolean('disabled', false);
      const loading = boolean('loading', false);
      const icon = text('icon', 'share');
      const innerText = text('text', '按钮文本');
      return (
        <i-button 
          type={type}
          size={size}
          shape={shape}
          long={long}
          html-type={htmlType}
          disabled={disabled}
          loading={loading}
          icon={icon}
        >
          {innerText}
        </i-button>
      );
    }
  }))
  

/* eslint-enable react/react-in-jsx-scope */


