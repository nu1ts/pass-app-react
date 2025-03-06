import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import router from './utils/route/route.config';
import { appStore } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={appStore}>
        <RouterProvider router={router} />
    </Provider>,
);
