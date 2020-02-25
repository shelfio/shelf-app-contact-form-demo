export interface AppState {
  email: string;
  category: string;
  isVisible: boolean;
  name: string;
  message: string;
  suggestedArticles: any; //TODO: use gem types
  loadingSuggestions: boolean;
  showSuccessMessage: boolean;
  changedLang: boolean;
}

export interface SearchOptions {
  accountId: string;
  shelfDomain: string;
  intentGroupId: string;
  searchIntentGroupId?: string;
}

export interface CategoryOption {
  label: string;
  text?: string;
  intent?: string;
}

export interface WidgetProps {
  isVisible?: boolean;
  triggerSelector?: string;
  searchOptions?: SearchOptions;
  categories: CategoryOption[];
  lang?: 'en' | 'uk';
}
