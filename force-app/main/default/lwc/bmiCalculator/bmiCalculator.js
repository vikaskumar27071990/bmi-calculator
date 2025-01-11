import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {

    // WEBISTE TO TEST=  http://troop27-portfolio-dev-ed.develop.my.site.com/bmi-calculator
height=''
weight=''
bmivalue=''
result=''

inputHandler(event){
 const {name,value}=event.target
    if(name==="height"){ this.height=value }
    
    if(name==="weight"){this.weight=value}
}


submitHandler(event){
event.preventDefault()//Don't Refersh the page
console.log("Height", this.height);
console.log("Weight", this.weight);
this.calculate();
}

calculate(){
let height=Number(this.height)/100;
let bmi=Number(this.weight)/(height*height)

//console.log('BMI IS ', Number(bmi.toFixed(2)) )
this.bmivalue=Number(bmi.toFixed(2))

if(this.bmivalue<18.5){this.result="underweight"}

else if(this.bmivalue>=18.5 && this.bmivalue<25){this.result="Healthy"}

else if(this.bmivalue>=25 && this.bmivalue<30){this.result="Overweight"}
else{
    this.result="Obese"
}
console.log('BMI IS ', this.bmivalue )
console.log('Result IS ', this.result )
}

recalculate(){
this.height=''
this.weight=''
this.bmivalue=''
this.result=''
             }
}