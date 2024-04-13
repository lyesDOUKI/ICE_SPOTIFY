import os
import speech_recognition as sr
from core.wav_utils import mp3_to_wav, is_mp3, repare_wav

def recognize_speech_from_audio(audio_file_path):
    recognizer = sr.Recognizer()
    if is_mp3(audio_file_path):
        print("Le fichier audio est un fichier MP3")
        mp3_to_wav(audio_file_path, "blob.wav")
        audio_file_path = "blob.wav"
        print("Le fichier audio a été converti en fichier WAV")
    audio_file_path = repare_wav(audio_file_path)
    # Vérifier si le fichier WAV a été créé avec succès
    if not os.path.exists(audio_file_path):
        print("Le fichier WAV n'a pas été créé.")
        return None
    
    with sr.AudioFile(audio_file_path) as source:
        print("Lecture du fichier audio")
        audio = recognizer.record(source)
        print("Reconnaissance vocale en cours...")
        try:
            text = recognizer.recognize_google(audio, language='fr-FR')
            return text
        except sr.RequestError:
            print("Erreur lors de la requête vers l'API Google Speech Recognition")
            return None
        except sr.UnknownValueError:
            print("Google Speech Recognition n'a pas pu comprendre l'audio")
            return None