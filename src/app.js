"use strict";

//The requirements for this app are as follows:

//DO NOT spend any time designing this app or making it look pretty. 
//We don’t want you to consider UX at all here, since the point is to build up 
//your programming fundamentals.

//At a minimum, you’ll need an HTML file and a JavaScript file. 
//The HTML file should link to jQuery and to your application JavaScript file. 
//The program should append each number (or its “fizz”/”buzz”/”fizzbuzz” substitution) to the body element of the DOM.

//The program should print out each number from 1 to 100, 
//replacing numbers divisible by both 3 and 5 with “fizz buzz”, 
//those divisible by 3 with “fizz”, 
//and those divisible by 5 with “buzz”.
//You should use Github for this project, and when it’s done, 
//publish it with Github pages.


function isFizz(number) {
  return number % 3 === 0;
}

function isBuzz(number) {
  return number % 5 === 0;
}

function isFizzBuzz(number) {
  return isFizz(number) && isBuzz(number);
}

function appendItem(result) {
  $("ul.list").append("<li>" + result + "</li>");
}

function doFizzBuzz(endCount) {
  var i;
  for (i = 1; i <= endCount; i++) {
    if (isFizzBuzz(i)) {
      console.log(i + "\tprinted Fizz Buzz");
      appendItem("Fizz Buzz!");
    } else if (isBuzz(i)) {
      console.log(i + "\tprinted Buzz");
      appendItem("Buzz!");
    } else if (isFizz(i)) {
      console.log(i + "\t printed Fizz");
      appendItem("Fizz!");
    }
  }
}
function doHandlebars() {
  var source = FizzBuzz.templates.MyApp();//this comes from precompiled templates
  var template = Handlebars.compile(source);
  var context = {title: "My New Post", body: "This is my first post!"};
  var html = template(context);
  $("ul.list").append(html);
}

$(document).ready(function () {
  $('#startingNumberButton').click(function () {
    var count = $("#startingNumber").val();
    alert('Count will try to use: ' + count);
    if (count.value !== 'undefined' || !isNaN(count)) {
      doFizzBuzz(count);
    }
    return false;//prevent default
  });
  //doHandlebars();
  
});
