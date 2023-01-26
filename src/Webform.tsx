import React from 'react';
import { createRoot } from 'react-dom/client';
import Form from './Form';
import {WidgetProps} from './types';

export default class Webform {
  static el;
  static root;

  static mount({parentElement = '', ...props}: {parentElement: string} & WidgetProps) {
    const component = <Form {...props} />;

    function doRender() {
      if (Webform.el) {
        throw new Error('Webform is already mounted, unmount first');
      }

      const el = document.createElement('div');
      // IMPORTANT: this className used in Webpack config,
      // styles applied just because of it
      el.setAttribute('class', 'AppHolder');

      if (parentElement) {
        // @ts-ignore
        document.querySelector(parentElement).appendChild(el);
      } else {
        document.body.appendChild(el);
      }
      const domNode = el;
      const root = createRoot(domNode);
      root.render(component);
      Webform.el = el;
      Webform.root = root;
    }
    if (document.readyState === 'complete') {
      doRender();
    } else {
      window.addEventListener('load', () => {
        doRender();
      });
    }
  }

  static unmount() {
    if (!Webform.el) {
      throw new Error('Webform is not mounted, mount first');
    }
    Webform.root.unmount();
    Webform.el.parentNode.removeChild(Webform.el);
    Webform.el = null;
  }
}
