import Tts from 'react-native-tts'

Tts.setDefaultLanguage('pt-BR');
Tts.setDefaultRate(0.33);
Tts.setDefaultPitch(0.70)

export default function speak(text){
  Tts.speak(text)
}