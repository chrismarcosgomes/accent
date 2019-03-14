const synth=window.speechSynthesis;

const textForm=document.querySelector("form");
const textInput=document.querySelector("#text-input");
const voiceSelect=document.querySelector("#voice-select");
const rate= document.querySelector("#rate");
const rateValue= document.querySelector("#rate-value");
const pitch=document.querySelector("#pitch");
const pitchValue=document.querySelector("#pitch-value");
const body= document.querySelector("body")

let voices=[];

const getVoices= ()=>{
    voices= synth.getVoices();
    // console.log(voices);

    // loop threw voice N create an option for each
    voices.forEach(voice=>{
        // create option element
        const option= document.createElement("option");
        // fill option with voice and language
        option.textContent=voice.name + '(' + voice.lang + ')';

        // set needed options attributes
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    })
};

getVoices();
if(synth.onvoiceschanged !== undefined){
synth.onvoiceschanged=getVoices
}

// speak

const speak=()=>{
   

    //check if speaking 
    if(synth.speaking){
        console.error("im already speaking bro")
        return;
    }
;

if(textInput.value !==""){
    body.style.background="#000000 url(images/wave.gif)";
    body.style.backgroundRepeat= "repeat-x";
    body.style.backgroundSize= "100% 100%";
    //get speaking text
    const speakText= new SpeechSynthesisUtterance(textInput.value);
    // speak ends
    speakText.onend= e=>{
        console.log("done speaking");
        body.style.background="#141414";
    }
;

speakText.onerror=e=>{
    console.error("im not working")
}
//select voice 
const selectedVoice= voiceSelect.selectedOptions[0]
.getAttribute("data-name")

// loop through voice
voices.forEach(voice=>{
    if(voice.name===selectedVoice){
        speakText.voice=voice;
    }
})
// set pitch and rat 
speakText.rate= rate.value;
speakText.pitch=pitch.value
// speak
synth.speak(speakText)

  }
};
//text form submit
textForm.addEventListener("submit",e=>{
    e.preventDefault();
    speak();
    textInput.blur()
});

// rate value change
rate.addEventListener("change",e=>(rateValue.textContent=rate.value));
// pitch value change
pitch.addEventListener("change",e=>(pitchValue.textContent=pitch.value));

//voice select change
voiceSelect.addEventListener("change",e => speak())