import os
import speech_recognition as sr
from core.mp3_to_wav import mp3_to_wav, is_mp3

def recognize_speech_from_audio(audio_file_path):
    recognizer = sr.Recognizer()
    if is_mp3(audio_file_path):
        wav_file = audio_file_path.replace('.mp3', '.wav')
        mp3_to_wav(audio_file_path, wav_file)
        audio_file_path = wav_file
    else:
        print("Le fichier n'est pas un fichier MP3.")
        return None

    # Vérifier si le fichier WAV a été créé avec succès
    if not os.path.exists(audio_file_path):
        print("Le fichier WAV n'a pas été créé.")
        return None

    with sr.AudioFile(audio_file_path) as source:
        audio = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio, language='fr-FR')
            return text
        except sr.RequestError:
            print("Erreur lors de la requête vers l'API Google Speech Recognition")
            return None
        except sr.UnknownValueError:
            print("Google Speech Recognition n'a pas pu comprendre l'audio")
            return None
