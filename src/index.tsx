import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './Form';

ReactDOM.render(
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
  />,
  document.getElementById('root')
);
