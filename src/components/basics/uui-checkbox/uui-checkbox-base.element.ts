import {
  LitElement,
  html,
  property,
  css,
  query,
  internalProperty,
  TemplateResult,
} from 'lit-element';
import { UUICheckboxEvent } from './UUICheckboxEvent';

type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

// TODO - validation - required option??? does it even make sense? if so what it should output. make it possible that it has to be checked.

/**
 *  @element uui-toggle
 *  @fires {UUIToggleEvent} change - fires when the element is begin checked by a user action
 *  @slot - to overwrite displayed label content
 *  @description - A Umbraco Toggle-switch, toggles between off/on
 */
export abstract class UUICheckboxBaseElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      label {
        cursor: pointer;
        user-select: none;
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        grid-template-rows: max-content 1fr max-content;
        grid-template-areas:
          'top-left top top-right'
          'left center right'
          'bottom-left bottom bottom-right';
        grid-gap: var(--uui-size-xsmall);
        row-gap: var(--uui-size-half-base-unit);
        align-items: center;
        justify-items: center;
      }

      input {
        position: absolute;
        height: 0px;
        width: 0px;
      }

      :host([label-position='left']) #label-display {
        grid-area: left;
      }

      :host([label-position='right']) #label-display {
        grid-area: right;
      }

      :host([label-position='top']) #label-display {
        grid-area: top;
      }

      :host([label-position='bottom']) #label-display {
        grid-area: bottom;
      }

      :host([disabled]) #label-display {
        opacity: 0.5;
      }
    `,
  ];

  static readonly formAssociated = true;

  private _internals;
  private inputRole: 'checkbox' | 'switch';

  constructor(inputRole: 'checkbox' | 'switch' = 'checkbox') {
    super();
    this.inputRole = inputRole;
    this._internals = (this as any).attachInternals();
  }

  @property({ type: String })
  form: string | null = null;

  @query('#input')
  protected _input!: HTMLInputElement;

  private _value = 'on';

  @property({ reflect: true })
  get value() {
    return this._value;
  }

  set value(newVal) {
    const oldValue = this._value;
    this._value = newVal;
    this._internals.setFormValue(this._checked ? this._value : null);
    this.requestUpdate('value', oldValue);
  }

  @property({ type: String })
  name = '';

  @property({ type: String })
  label!: string;

  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: LabelPosition = 'right';

  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  private _checked = false;

  @property({ type: Boolean, reflect: true })
  get checked() {
    return this._checked;
  }

  set checked(newVal) {
    const oldValue = this._checked;
    this._checked = newVal;
    this._internals.setFormValue(this._checked ? this._value : null);
    this.requestUpdate('checked', oldValue);
  }

  @property({ type: Boolean, reflect: true })
  disabled = false;

  firstUpdated() {
    if (!this.label) {
      console.warn(this.tagName + ' needs a `label`');
    }
  }

  private _onInputChange() {
    this.dispatchEvent(new UUICheckboxEvent(UUICheckboxEvent.CHANGE));
    this.checked = this._input.checked;
  }

  @query('slot')
  protected labelSlot!: HTMLSlotElement;

  @internalProperty()
  protected labelSlotHasContent = false;

  private labelSlotChanged(): void {
    this.labelSlotHasContent =
      (this.labelSlot as HTMLSlotElement).assignedElements({ flatten: true })
        .length > 0;
  }

  protected abstract renderCheckbox(): TemplateResult;

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          id="input"
          ?disabled="${this.disabled}"
          @change="${this._onInputChange}"
          .checked="${this.checked}"
          aria-checked="${this.checked ? 'true' : 'false'}"
          aria-label=${this.label}
          role="${this.inputRole}"
        />
        ${this.renderCheckbox()}
        <div id="label-display" aria-hidden="true">
          ${this.labelSlotHasContent === false && this.hideLabel === false
            ? this.label
            : ''}
          <slot @slotchange=${this.labelSlotChanged}></slot>
        </div>
      </label>
    `;
  }
}

//
