// pattern to avoid circular imports
// https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de

export * from './fun-module';

// To do default exports, use this

/*
import NameYouWant from './path/default-export-module';

export { NameYouWant };
*/
