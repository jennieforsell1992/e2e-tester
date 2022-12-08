import { mockData } from "./../../src/ts/services/__mocks__/movieservice";

beforeEach(() => {
  cy.visit("/");
});

describe("search movies", () => {
  it("should have title", () => {
    cy.get("title").contains("Async testing");
  });

  it("should put text in input", () => {
    cy.get("input").type("text").should("have.value", "text");
  });

  it("should have button", () => {
    cy.get("button").contains("Sök");
  });

  it("should get real data, movies", () => {
    cy.get("input").type("star").should("have.value", "star");
    cy.get("form").submit();
    cy.get("div#movie-container > div.movie").should("have.length", 10);
  });

  it("should get movies", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div#movie-container > div.movie").should("have.length", 3);
  });

  it("should get headings", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div.movie > h3").should("have.length", 3);
  });

  it("should get last heading", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div.movie:last > h3").contains("Pelle svanslös");
  });

  it("should get img", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div.movie > img").should("have.length", 3);
  });
});

describe("displayNoResult", () => {
  it("should have error message", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fakeSearch: [] });

    cy.get("form").submit();

    cy.get("div#movie-container > p").contains("Inga sökresultat att visa");
  });
  it("should have 0 movies", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fakeSearch: [] });

    cy.get("form").submit();

    cy.get("div#movie-container > div.movies").should("have.length", 0);
  });
});
