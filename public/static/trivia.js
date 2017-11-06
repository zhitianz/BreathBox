
var TQ = function(question, ansA, ansB, ansC, ansD, correct, bp){
	this.question = question;
	this.ansA = ansA;
	this.ansB = ansB;
	this.ansC = ansC;
	this.ansD = ansD;
	this.correct = correct;
	this.bp = bp;
};


var trivia=[];

console.log("Trivia file engage");

var tmain = new TQ("A person's a person no matter:___", "who", "how small", "what", "how tired", "B", 1);
trivia.push(tmain);
tmain = new TQ("The cow jumped over the:___", "moon", "spoon", "barn", "kremlin", "A", 1);
trivia.push(tmain);
tmain = new TQ("Penny for your:___?", "life", "cow", "thoughts", "desires", "C", 1);
trivia.push(tmain);
tmain = new TQ("Let's cut to the:___", "bone", "tornado", "chase", "cheese", "C", 1);
trivia.push(tmain);
tmain = new TQ("Do. Or do not. There is no:___", "cry", "try", "lie", "rye", "B", 2);
trivia.push(tmain);
tmain = new TQ("Give us your tired, your poor, your:___", "immigrants", "deplorables", "unwashed masses", "huddled masses", "D", 2);
trivia.push(tmain);
tmain = new TQ("True friends stab you in the:___", "front", "dark", "heart", "shoe", "A", 2);
trivia.push(tmain);
tmain = new TQ("If you want to live a happy life, tie it to a:___", "dream", "balloon", "goal", "ideal", "C", 3);
trivia.push(tmain);
tmain = new TQ("Be yourself, Everyone else is already:___ ", "handled", "taken", "unique", "special", "B", 3);
trivia.push(tmain);
console.log(trivia);


var getRandomTriv = function(){
    var choice = Math.round(Math.random()*trivia.length);
    return trivia[choice];
};

window.onload = function(){
    document.getElementById("rtb").style.display = "block";

};