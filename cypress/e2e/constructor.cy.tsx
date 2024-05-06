import Cypress from 'cypress';

describe('проверяем доступность приложения', function() {
  it('сервис должен быть доступен по адресу localhost:4000', function() {
      cy.visit('http://localhost:4000'); 
  });
});

describe('Проверяем целиком приложение', () => {
  beforeEach(()=>{//выполняется перед каждым тестом внутри describe
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('getIngredients'); //Настроен перехват запроса на эндпоинт 'api/ingredients’
    cy.intercept('GET', 'api/auth/user', {fixture: 'authUser.json'}).as('getUser');;
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'}).as('getOrder');;
    cy.visit('http://localhost:4000'); //Открываем веб-страницу по адресу
  })

  describe('дополнительные проверки', function() {
    it('Проверка, что данные ингредиентов подменили', () => {
      expect('@getIngredients');
    });
    it('Проверка, что данные клиента подменили', () => {
      expect('@getUser');
    });
    it('Проверка, что данные заказа подменили', () => {
      expect('@getOrder');
    });
  });

  describe('проверяем кнопки добавления', function() {
    it('Булка (bun)', () => {
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa093c']`).children('button').click();
    });
    it('Начинка (main)', () => {
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa0941']`).children('button').click();
    });
    it('Соус (sauce)', () => {
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa0942']`).children('button').click();
    });
  });

  describe('проверяем работу модалок', function() {
    it('Открытие модального окна ингредиента', () => {
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa093c']`).click();
      cy.get(`[data-cy ='modal']`).should('exist');//проверка, что существует (проверяет наличие элемента на странице)
    });
    it('Отображение в открытом модальном окне данных именно того ингредиента, по которому произошел клик.', () => {
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa093c']`).click();
      cy.get(`[data-cy ='modal']`).should('exist');//проверка, что существует (проверяет наличие элемента на странице)
      cy.get('[data-cy="image-ingredient"]').should('be.visible');
      cy.get(`[data-cy ='name-ingredient']`).should('have.text', "Краторная булка N-200i");
      cy.get(`[data-cy ='calories-ingredient']`).should('have.text', "420");
      cy.get(`[data-cy ='proteins-ingredient']`).should('have.text', "80");
      cy.get(`[data-cy ='fat-ingredient']`).should('have.text', "24");
      cy.get(`[data-cy ='carbohydrates-ingredient']`).should('have.text', "53");
    });
    it('Закрытие модального окна ингредиента по крестику', () => {
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa093c']`).click();
      cy.get(`[data-cy ='buttonOnClose']`).click();
      cy.get(`[data-cy ='modal']`).should('not.exist');//проверка, что не существует
    });
    it('Закрытие модального окна ингредиента по оверлею', () => {
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa093c']`).click();
      cy.get(`[data-cy ='modal-overlay']`).click({force:true});//Опция {force:true} используется для принудительного выполнения действия, игнорируя любые препятствия, которые могут возникнуть.
      cy.get(`[data-cy ='modal']`).should('not.exist');//проверка, что не существует
    });
  });

  describe('проверяем создание заказа', function() {
    beforeEach(()=>{//выполняется перед каждым тестом внутри describe
      cy.setCookie('accessToken', 'test-accessToken');
      localStorage.setItem('refreshToken', 'test-refreshToken');
    })
    this.afterEach(()=>{ //выполняется после 
      cy.clearCookie('accessToken');
      cy.clearLocalStorage('refreshToken');
    })

    it('Оформление заказа', () => {
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa093d']`).children('button').click();
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa093e']`).children('button').click();
      cy.get(`[data-cy ='643d69a5c3f7b9001cfa0940']`).children('button').click();
      cy.contains('Оформить заказ').click();
      cy.get(`[data-cy ='orderNumber']`).should('have.text', "39393");
      cy.get(`[data-cy ='buttonOnClose']`).click();
      cy.get(`[data-cy ='modal']`).should('not.exist');//проверка, что модалка закрылась
      cy.contains('Выберите булки').should('exist');//проверка, что пусто
      cy.contains('Выберите начинку').should('exist');//проверка, что пусто
    });
  });


  
});
