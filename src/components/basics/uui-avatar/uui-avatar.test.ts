import { html, fixture, expect } from '@open-wc/testing';

import '.';
import { UUIAvatarElement } from './uui-avatar.element';

describe('UuiAvatar', () => {
  let element: UUIAvatarElement;
  beforeEach(async () => {
    element = await fixture(html`<uui-avatar></uui-avatar>`);
  });

  it('renders an image when imgSrc is set', async () => {
    const avatar = await fixture(html`<uui-avatar img-src="src"></uui-avatar>`);
    expect(avatar).shadowDom.to.equal(
      '<img alt="" class="image" src="src" srcset="" /><slot></<slot>'
    );
  });

  it('renders an image with alt text when imgSrc and text is set', async () => {
    const avatar = await fixture(
      html`<uui-avatar img-src="src" text="alt text"></uui-avatar>`
    );
    expect(avatar).shadowDom.to.equal(
      '<img alt="alt text" class="image" src="src" srcset="" /><slot></<slot>'
    );
  });

  it('shows the first initial when text is used and there is no image', async () => {
    const avatar = await fixture(html`<uui-avatar text="First"></uui-avatar>`);
    expect(avatar).shadowDom.to.equal('F<slot></<slot>');
  });

  it('shows the first and last initial when text is used and there is no image', async () => {
    const avatar = await fixture(
      html`<uui-avatar text="First Second Last"></uui-avatar>`
    );
    expect(avatar).shadowDom.to.equal('FL<slot></<slot>');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
