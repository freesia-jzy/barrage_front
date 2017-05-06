/**
 * Created by qoder on 16-12-19.
 */
'use strict';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match} from 'react-router';
import RouterApp from './router';

function server(cxt) {
  let html = "";
  match({routes: RouterApp(), location: cxt.request.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      html = error;
    } else if (redirectLocation) {
      cxt.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const InitialView = (
        <RouterContext {...renderProps} />
      );
      const componentHTML = renderToString(InitialView);
      html = componentHTML;
    } else {
      html = '404 not found';
    }
  })

  return html;
}

export default server;
