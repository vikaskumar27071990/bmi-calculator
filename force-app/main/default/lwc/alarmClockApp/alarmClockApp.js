import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets'
export default class AlarmClockApp extends LightningElement {
clockImage=AlarmClockAssets+'/AlarmClockAssets/clock.png'
ringtone=new Audio(AlarmClockAssets+'/AlarmClockAssets/Clocksound.mp3')
currentTime=''
hours=[]
minutes=[]
meridiems=['AM','PM']
hourSelected 
minSelected 
meridiemSelected
alarmTime
isAlarmSet=false
isAlarmTriggered=false

get isFieldNotSelected(){
  return !(this.hourSelected && this.minSelected && this.meridiemSelected)
}

get shakeImage(){return this.isAlarmTriggered ? 'shake': ''}

    connectedCallback(){
        this.currentTimeHandler()
        this.createHoursOptions()
        this.createMinutesOptions()
    }

    currentTimeHandler(){
        setInterval(()=>{
        let dateTime=new Date()
        let hour=dateTime.getHours()
        let min=dateTime.getMinutes()
        let sec=dateTime.getSeconds()
        let ampm= "AM"

        if(hour===0){ 
        hour=12;
        ampm= "AM";  }

        else if(hour===12){
            
            ampm="PM";
                    }
        else if(hour>=12){
            hour-=12;
            ampm="PM";
        }
            hour = hour<10 ? "0"+hour : hour;
            min = min<10 ? "0"+min : min;
            sec = sec<10 ? "0"+sec : sec; 
            this.currentTime=`${hour}:${min}:${sec} ${ampm}`;
            /*if (this.alarmTime === `${hour}:${min} ${ampm}`) {
                console.log("Alarm Triggered!!");
                this.isAlarmTriggered = true;
                this.ringtone.play();
                this.ringtone.loop = true;
              }*/
                if(this.alarmTime === `${hour}:${min} ${ampm}`){
                   console.log("Alarm Triggered!!");
                   this.isAlarmTriggered=true
                   this.ringtone.play()
                   this.ringtone.loop=true
                }
              
            }, 1000);
          }


          createHoursOptions(){
             for(let i=1; i<=12;i++){
                let val=i<10 ? "0"+i :i
                this.hours.push(val);
             }
           }

           createMinutesOptions(){
            for(let i=0; i<=59;i++){
               let val=i<10 ? "0"+i :i
               this.minutes.push(val);
            }
          }

          optionhandler(event){
            const {label, value} = event.detail

            if(label==="Hour(s)"){ this.hourSelected=value}
       else if(label==="Minute(s)"){this.minSelected=value}
       else if(label==="AM/PM"){this.meridiemSelected=value} 
       else {}

       console.log(" this.hourSelected ", this.hourSelected);
       console.log(" this.minSelected ", this.minSelected);
       console.log(" this.meridiemSelected ", this.meridiemSelected);
          }

          setAlarmHandler(){
            this.alarmTime=`${this.hourSelected}:${this.minSelected} ${this.meridiemSelected}`
            this.isAlarmSet=true
          }

          clearAlarmHandler(){
            this.alarmTime=''
            this.isAlarmSet=false
            this.isAlarmTriggered=false
            const elements=this.template.querySelectorAll('c-clock-dropdown')//It Return a node like array
            this.ringtone.pause()
            //First we convert element to array then iterate them one by one 
            Array.from(elements).forEach(element=>{element.reset("")})

            /* reset() in child for reset
            this.hourSelected='' 
            this.minSelected='' 
            this.meridiemSelected=''
            */
          }
        }