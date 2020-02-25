import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      placeholder: 'Please Select',
      contact: 'Contact Us',
      namePlaceholder: 'Enter a name',
      emailPlaceholder: 'Enter an email',
      'dropdown-category': 'Use the dropdown selection that best describes your inquiry.',
      name: 'Your name',
      email: 'Your email address',
      problem: 'Describe your problem here',
      problem_placeholder: 'How we can help you?',
      articles: 'Here are articles that might help you find an answer:',
      submit: 'SUBMIT',
      thanks: 'Thank you for your submission.',
      submissionMessage: 'Your question has been sent. We will try to contact you within 48 hours.'
    }
  },
  uk: {
    translation: {
      placeholder: 'Оберіть категорію',
      'dropdown-category': 'Виберіть категорію, що найкраще описує ваш запит',
      contact: "Зворотній зв'язок",
      name: "Ваше ім'я",
      namePlaceholder: 'Введіть',
      emailPlaceholder: 'Введіть електронну скриньку',
      email: 'Електронна скринька',
      problem: 'Опишіть Вашу проблему',
      problem_placeholder: 'Як Вам допомогти?',
      articles: 'Ось статті, які можуть допомогти вам знайти відповідь:',
      submit: 'ВІДПРАВИТИ',
      thanks: 'Дякуємо за відгук.',
      submissionMessage:
        "Ваше повідомлення було відправлено. Ми зв'яжемося з Вами протягом 48 годин."
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
