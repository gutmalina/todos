describe("works app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open, displaying list todos", ()=>{    
    cy.get(`[class^=simple-input_input_text`).focus().type('Купить продуктов').blur();
    cy.get(`[class^=render-todo_btn`).click();
    cy.get('input[name="1"]').focus().type('Сходить в бассейн').blur();
    cy.get(`[class^=render-todo_btn`).click();
    cy.get('input[name="2"]').focus().type('Погулять с собакой').blur();
    cy.get(`[class^=render-todo_btn`).click();
    cy.get('input[name="3"]').focus().type('Встретиться с друзьями').blur();
    cy.get('fieldset[id="0"]').children(`#edit`).click()
    cy.get('input[name="0"]').focus().type('Заказать продукты').blur();
    cy.get('fieldset[id="2"]').children(`#delete`).click()
    cy.get(`[class^=render-todo_btn`).click();
    cy.get('input[name="3"]').focus().type('Погулять с собакой').blur();
  })
});
