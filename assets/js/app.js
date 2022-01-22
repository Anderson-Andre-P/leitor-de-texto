const textarea = document.querySelector("textarea"),
  voiceList = document.querySelector("select"),
  speechBtn = document.querySelector("button");

let synth = speechSynthesis,
  isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    // selecting 'Google português do Brasil' voice as default
    let selected =
      voice.name === "Google português do Brasil" ? "selected" : "";

    // creating an option tag with voice name and voice language
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option); // inserting option tag beforeend of select tag
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);

  for (let voice of synth.getVoices()) {
    // if the available device voice name is equal to the user selected voice name then set the speech voice to the user selected voice
    if (voice.name === voiceList.value) {
      utternance.voice = voice;
    }
  }

  synth.speak(utternance); // speack the speech/utternance
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    if (!synth.speaking) {
      // if an utternance/speech is not currently in the currently in the process of speaking
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      // if isSpeaking is true then change it's value to false and resume the utterance/speech else change it's value to true and pause the speech
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pausar Fala";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Continuar Fala";
      }

      // checking is utternance/speech in speaking process or not in every 100ms if not then set the value of isSpeaking to true and change the button text
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Texto Para Fala";
        }
      });
    } else {
      speechBtn.innerText = "Texto Falado";
    }
  }
});
