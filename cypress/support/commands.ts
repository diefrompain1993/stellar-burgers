// Custom commands
Cypress.Commands.add(
  'drag',
  { prevSubject: 'element' },
  (subject: JQuery<HTMLElement>, targetSelector: string) => {
    cy.wrap(subject).trigger('dragstart');
    cy.get(targetSelector).trigger('drop');
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      drag(targetSelector: string): Chainable<Element>;
    }
  }
}
