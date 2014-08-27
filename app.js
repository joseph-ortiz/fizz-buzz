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


function isFizz(number){
	return number%3 === 0;
}

function isBuzz(number){
	return number%5===0;
}

function isFizzBuzz(number)
{
	return (isFizz(number) && isBuzz(number)) 
}

var count = 100;
for(var i = 1; i <= count; i++)
{
	if(isFizzBuzz(i))
		console.log( i + "\tprinted Fizz Buzz");
	else if(isBuzz(i))
		console.log(i + "\tprinted Buzz");
	else if(isFizz(i))
		console.log(i + "\t printed Fizz");
}