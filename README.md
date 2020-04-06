# Web Form Demo

## How use widget:

```html
<!-- Mount point -->
<div id="not-root"></div>
<script src="/lib/main.js"></script>
<script>
  Webform.mount({
    parentElement: 'body', // Mounting selector
    triggerSelector: '[href="#open-contact-form"]', // selector to trigger opening of modal window
    searchOptions: {
      accountId: 'SHELF_ACCOUNT_ID',
      shelfDomain: 'api.shelf.io',
      intentGroupId: 'pure-cloud-demo', // Shelf intentGroupId
      searchIntentGroupId: 'pure-cloud-demo' // Shelf intentGroupId for free input
    },
    categories: [
      {
        //What user see on dropdown
        label: 'What is the Difference Between a Loan and a Lease?',
        //Possible terms for shelf search
        intent: 'What is the Difference Between a Loan and a Lease?'
      }
    ]
  });
</script>
```

## Working example

- install dependencies
- `yarn run-widget` or `npm run run-widget`
- open browser in `http://localhost:8080/widget-test.html`

## Make changes in widget

Check `src` folder with widget code, change and run `yarn build-widget`

## Folder structure

```
src                # Exports + components
├── api            # API calls for Shelf
├── i18n           # Localization
└── types          # TS types for every component
```
