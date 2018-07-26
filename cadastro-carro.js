(function(DOM) {
  'use strict';

  function app(){

    var $conteudo = new DOM('#conteudo');
    var $cadastrar = new DOM('[data-js="cadastrar"]');
    var $tableCars = new DOM('[data-js="tableCars"]');
    var $error = new DOM('[data-js="error"]').get()[0];

    var tablerow;

    var $removeBtn = new DOM('[data-js="removeBtn"]').get()[0];

    $cadastrar.on('click', function(e){
      e.preventDefault();
      testValues();
      
      if ( testValues() ){
        tablerow = $tableCars.get()[0].appendChild(document.createElement('tr'));

        $conteudo.forEach(function(arg){
          var row = tablerow.appendChild(document.createElement('td'));
          if (arg.getAttribute('data-js') == 'imgCarro'){
            var $img = row.appendChild(document.createElement('img'));
            $img.setAttribute('src', arg.value);
          } else {
            row.textContent = arg.value;
          }
        });

        var $remove = tablerow.appendChild(document.createElement('td')).appendChild(document.createElement('button'));
        $remove.setAttribute('data-js', 'removeBtn');
        $remove.textContent = 'Remover';
        deleteRow();
      }

      function testValues(){
        // if ( !($conteudo.get()[0].value.match(/^(https?):.+(jpg|png|gif|svg)$/g)) ){
        //   $error.textContent = 'Insira uma imagem válida';
        //   return false;
        // }
        if ( !($conteudo.get()[1].value) ){
          $error.textContent = 'Insira uma marca';
          return false;
        }
        // if ( !($conteudo.get()[2].value.match(/\d{2,4}/g)) ){
        //   $error.textContent = 'Insira um ano válido';
        //   return false;
        // }
        // if ( !($conteudo.get()[3].value.match(/\w{3}-\d{4}/g)) ){
        //   $error.textContent = 'Insira uma placa válida';
        //   return false;
        // }
        // if ( !($conteudo.get()[4].value.match(/^[A-Za-z]+$/g)) ){
        //   $error.textContent = 'Insira uma cor válida';
        //   return false;
        // }
        return true;
      }
    });
    
    //verificar deleção de row
    function deleteRow(){
      var $removeBtn = new DOM('[data-js="removeBtn"]').get();
      console.log($removeBtn[0]);
      var i = $tableCars.get()[0].childElementCount;
      $removeBtn[i-1].addEventListener('click', function(){
        console.log(this.parentNode.parentNode.parentNode);
        var kill = this.parentNode.parentNode.parentNode.childNodes[i-1];
        console.log(kill);
        this.parentNode.parentNode.parentNode.removeChild(kill);
      }, false);
    }


  }

  var $company = new DOM('[data-js="company"]');
  var $telephone = new DOM('[data-js="telephone"]');
  var ajax = new XMLHttpRequest();
  ajax.open('GET', 'company.json');
  ajax.send();

  ajax.addEventListener('readystatechange', function(){
    if (ajax.readyState === 4 && ajax.status === 200){
      var data = JSON.parse(ajax.responseText);
      $company.get()[0].textContent = data.name;
      $telephone.get()[0].textContent = data.phone;
    }
  });

  app();

})(window.DOM);
