import { IMovie } from "./../../src/ts/models/Movie";
import { mockData } from "./../../src/ts/services/__mocks__/movieservice";

describe("search movies", () => {
  it("should show my webside", () => {
    cy.visit("http://localhost:1234");
  });

  it("should put text in input", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("text").should("have.value", "text");
  });

  it("should have button", () => {
    cy.visit("http://localhost:1234");
    cy.get("button").contains("Sök");
  });

  it("should get 3 headings", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div.movie > h3").should("have.length", 3);
  });

  it("should get fake movies", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div#movie-container > div.movie").should("have.length", 3);
  });

  it("should get fake last heading", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div.movie:last > h3").contains("Pelle svanslös");
  });

  it("should get heading", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div.movie > h3").should("have.length", 3);
  });

  it("should get fake img", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();
    cy.get("div.movie > img").should("have.length", 3);
  });
});

describe("displayNoResult", () => {
  it("should have error message", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", { fakeSearch: [] });

    cy.get("form").submit();

    cy.get("div#movie-container > p").contains("Inga sökresultat att visa");
  });
  it("should have 0 movies", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", { fakeSearch: [] });

    cy.get("form").submit();

    cy.get("div#movie-container > div.movies").should("have.length", 0);
  });
});
