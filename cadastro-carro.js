(function($){

  var app = (function(){
      return {
          init: function  init() {
              console.log('app init');
              this.companyInfo();
              this.initEvents();
          },

          initEvents: function initEvents() {
              $('[data-js="form-register"]').on('submit', this.handleSubmit);
          },

          handleSubmit: function handleSubmit(e) {
              e.preventDefault();
              var $tableCar = $('[data-js="tableCars"]').get();
              var $tr = app.createNewCar();
              $tableCar.appendChild($tr);
              $('[data-js="form-register"]').get().reset();
          },

          createRemoveButton: function createRemoveButton(e) {
              var $tdRemove = document.createElement('td');
              var $buttonRemove = document.createElement('button');

              $buttonRemove.setAttribute('data-js', 'removeBtn');
              $buttonRemove.textContent = 'Remover';
              $tdRemove.appendChild($buttonRemove);

              e.appendChild($tdRemove);

              $buttonRemove.addEventListener('click', function(){
                  $('[data-js="tableCars"]').get().removeChild(e);
              });

          },

          createNewCar: function createNewCar() {
              //criar todos a linha da tabela com todos os dados do carro
              var $fragment = document.createDocumentFragment();
              var $tr = document.createElement('tr');
              var $tdImage = document.createElement('td');
              var $image = document.createElement('img');
              var $tdBrand = document.createElement('td');
              var $tdYear = document.createElement('td');
              var $tdPlate = document.createElement('td');
              var $tdColor = document.createElement('td');
              
              //criar a imagem da primeira coluna
              $image.setAttribute('src', $('[data-js="imageCar"]').get().value);
              $tdImage.appendChild($image);

              //inserção de conteúdo dentro das colunas
              $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
              $tdYear.textContent = $('[data-js="year"]').get().value;
              $tdPlate.textContent = $('[data-js="plate"]').get().value;
              $tdColor.textContent = $('[data-js="color"]').get().value;

              //adicionar colunas dentro da linha
              $tr.appendChild($tdImage);
              $tr.appendChild($tdBrand);
              $tr.appendChild($tdYear);
              $tr.appendChild($tdPlate);
              $tr.appendChild($tdColor);

              app.createRemoveButton($tr);

              return $fragment.appendChild($tr);
          },

          companyInfo: function companyInfo() {
              //faz a conexão com o JSON
              var ajax = new XMLHttpRequest();
              ajax.open('GET', '/company.json', true);
              ajax.send();
              ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
          },

          getCompanyInfo: function getCompanyInfo(){
              //verifica se a conexão foi bem sucedida
              if(!app.isReady.call(this)) 
                  return;
              //pega os dados e insere no HTML
              var data = JSON.parse(this.responseText);
              var $companyName = $('[data-js="company"]').get();
              var $telephoneNumber = $('[data-js="telephone"]').get();
              $companyName.textContent = data.name;
              $telephoneNumber.textContent = data.phone;
          },
          
          isReady: function isReady(){
              return this.readyState == 4 && this.status === 200;
          }
      };
  })();

  app.init();

})(window.DOM);