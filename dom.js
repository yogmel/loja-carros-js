(function() {
  'use strict';
   //lib DOM
   function DOM(elements){
    if(!(this instanceof DOM))
      return new DOM(elements);
    this.element = document.querySelectorAll(elements);
    }

    //métodos estáticos
    DOM.isArray = function isArray(obj){
      return transformType(obj) === '[object Array]';
    }

    DOM.isObject = function isObject(obj){
      return transformType(obj) === '[object Object]';
    }

    DOM.isFunction = function isFunction(obj){
      return transformType(obj) === '[object Function]';
    }

    DOM.isNumber = function isNumber(obj){
      return transformType(obj) === '[object Number]';
    }

    DOM.isString = function isString(obj){
      return transformType(obj) === '[object String]';
    }

    DOM.isBoolean = function isBoolean(obj){
      return transformType(obj) === '[object Boolean]';
    }

    DOM.isNull = function isNull(obj){
      return transformType(obj) === '[object Null]' || '[object Undefined]';
    }

   DOM.prototype.on = function on (event, callback) {
     Array.prototype.forEach.call( this.element, function(element) {
       element.addEventListener(event, callback, false);
     });
   };

   DOM.prototype.off = function off () {
     Array.prototype.forEach.call( this.element, function(btn) {
       btn.removeEventListener(event, callback, false);
     });
   };

   DOM.prototype.get = function get (index) {
    //se nenhum índice for passado, retornar o elemento de índice 0
    if(!index)
      return this.element[0];
    return this.element[index];
   }

   DOM.prototype.forEach = function forEach() {
     return Array.prototype.forEach.apply( this.element, arguments );
   }

   DOM.prototype.map = function map() {
     return Array.prototype.map.call( this.element, arguments );
   }

   DOM.prototype.filter = function filter() {
     return Array.prototype.filter.call( this.element, arguments );
   }

   DOM.prototype.reduce = function reduce() {
     return Array.prototype.reduce.call( this.element, arguments );
   }

   DOM.prototype.reduceRight = function reduceRight() {
     return Array.prototype.reduceRight.call( this.element, arguments );
   }

   DOM.prototype.every = function every() {
     return Array.prototype.every.call( this.element, arguments );
   }

   DOM.prototype.some = function some() {
     return Array.prototype.some.call( this.element, arguments );
   }


   function transformType(a){
     return Object.prototype.toString.call(a);
   }

   window.DOM = DOM;
})();