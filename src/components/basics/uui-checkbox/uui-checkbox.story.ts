import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Checkbox',
  component: 'uui-checkbox',
};

export const Basic = () =>
  html` <uui-checkbox .label=${'Checkbox label'} value="bike"></uui-checkbox> `;

export const Preselected = () =>
  html` <uui-checkbox
    .label=${'Checkbox label'}
    value="bike"
    checked
  ></uui-checkbox>`;

export const WithSlottedLabel = () =>
  html`
    <uui-checkbox .label=${'Checkbox label'} value="bike"
      >Using <b>Slot</b> for displayed label
    </uui-checkbox>
  `;

export const LabelPosition = () => html`
  <div style="display: flex; justify-content: space-evenly;">
    <uui-checkbox
      .label=${'Checkbox label'}
      label-position="left"
    ></uui-checkbox>
    <uui-checkbox
      .label=${'Checkbox label'}
      label-position="top"
    ></uui-checkbox>
    <uui-checkbox
      .label=${'Checkbox label'}
      label-position="right"
    ></uui-checkbox>
    <uui-checkbox
      .label=${'Checkbox label'}
      label-position="bottom"
    ></uui-checkbox>
  </div>
`;

export const NoLabel = () =>
  html`<uui-checkbox
      hide-label
      .label=${'Checkbox label'}
      name="Hidden Label"
    ></uui-checkbox
    ><uui-checkbox
      hide-label
      .label=${'Checkbox label'}
      name="Hidden Label 2"
    ></uui-checkbox>
    <p>
      label is set via label attribute. Hide it by adding hide-label bool
      attribute
    </p>`;

export const Disabled = () => html`
  <uui-checkbox disabled .label=${'Checkbox label'}></uui-checkbox>
  <uui-checkbox disabled .label=${'Checkbox label'} checked></uui-checkbox>
`;

export const InAForm = () => html`
  <form action="">
    <uui-checkbox .label=${'Checkbox label'}></uui-checkbox>
  </form>
`;
