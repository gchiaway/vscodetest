function byid(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}
var apic=byid("tab-content").getElementsByTagName("li");
var sbtn=byid("tab-content").getElementsByTagName("p");
var apicc=byid("tab-content").getElementsByClassName("drop-down");
var sbtn1=document.getElementById("tab-content").getElementsByClassName("chapter-sub");

console.log(apic.length);
console.log(sbtn.length);
console.log(apicc.length);
console.log(sbtn1.length);


//$(document).ready(function(){
//				$("#accordion").accordion();
//			});
//for(var j=0;j<apicc.length;j++){
//	apicc[j].id=j;
//	apicc[j].onclick=function(){
//				index = this.id;
//				$("sbtn1[index]").slideToggle(1000);
//			}	
//}

//$("#drop-down").click=function(){
//	$("#drop-down").
//}
//$(selector).slideDown(speed,callback);
//id="chapter-sub"
//id="drop-down"