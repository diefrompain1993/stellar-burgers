/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    drag(targetSelector: string): Chainable<Element>;
  }
}
