import { html } from 'lit';
import '../src/my-card-wk6.js';

export default {
  title: 'MyCardWk6',
  component: 'my-card-wk6',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <my-card-wk6
      style="--my-card-wk6-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </my-card-wk6>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
