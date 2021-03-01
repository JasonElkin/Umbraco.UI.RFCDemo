import { LitElement, css, property } from 'lit-element';
import { UUIIconService } from '../../../service/iconservice/UUIIconService';
/**
 *  @element uui-icon
 *
 */

// TODO: Allow for slotted SVG.
export class UUIIconElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: bottom;
        width: 1.15em;
        height: 1.15em;
      }

      :host svg {
        fill: currentColor;
      }
    `,
  ];

  private _name: string | null = null;
  @property()
  get name(): string | null {
    return this._name;
  }
  set name(newValue) {
    this._name = newValue;
    if (this._name !== '' && this._name !== null) {
      UUIIconService.getIcon(this._name).then((svg: string) => {
        if (this.shadowRoot) {
          this.shadowRoot.innerHTML = svg;
        }
      });
    }
  }
}
