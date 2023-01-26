import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Form from './Form';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <Form
    isVisible={true}
    categories={[
      {label: 'Робота з рахунками', text: 'паперову виписку термінів'},
      {label: 'Управління вашим акаунтом', text: 'Управління вашим акаунтом'},
      {label: 'Взаємні фонди', text: 'Взаємні фонди'},
      {label: 'Загальні питання', text: 'Загальні питання'},
      {label: 'Сталий розвиток', text: 'Сталий розвиток'},
      {label: 'Послуги', text: 'Послуги'}
    ]}
  />);
