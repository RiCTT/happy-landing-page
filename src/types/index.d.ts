declare interface RulesItem {
  trigger?: [string, string[]];
  message?: string;
  validator?: any;
  required?: boolean;
}
