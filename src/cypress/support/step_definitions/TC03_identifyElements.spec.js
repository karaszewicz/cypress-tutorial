import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
/// <reference types="Cypress" />

Given("I open Conduit login page", () => {
  cy.visit("/login");
  cy.title().should("eq", "Conduit");
  cy.location("protocol").should("eq", "https:");
});

When("I Sign In", () => {
  cy.get("form").within(($form) => {
    // cy.get() will only search for elements within form, not within the entire document
    cy.get('input[type = "email"]').type("shimpy.kumari1@ibm.com");
    cy.get('input[type = "password"]').type("cypressdemo");
    cy.root().submit(); // submits the form yielded from 'within'
  });
  cy.contains("Your Feed", { timeout: 10000 }).should("be.visible");
});

And("I create a new post", () => {
  cy.get("ul.navbar-nav").children().contains("New Post").click();
  cy.hash().should("include", "#/editor");
  cy.get("form").within(($form) => {
    cy.get("input").first().type("Test");
    cy.get("input").eq(1).type("Test 1");
    cy.get("textarea").last().type("Test 2");
    cy.contains("Publish Article").click();
  });
  cy.url().should("include", "article");
});

Then("I mark unmark as favorite", () => {
  cy.get("ul.navbar-nav").children().contains("shimpy_kumari").click();
  cy.contains("My Articles").should("be.visible");
  cy.get(".ion-heart").first().click();
  cy.contains("Favorited Articles").click();
  cy.url().should("include", "favorites");
  cy.get(".ion-heart").first().click();
  cy.reload();
  //cy.contains("No articles are here... yet.").should("be.visible");
  cy.go("back");
});
