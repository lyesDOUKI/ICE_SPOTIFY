from pydub import AudioSegment

def mp3_to_wav(mp3_file, wav_file):
    # Chargement du fichier MP3
    audio = AudioSegment.from_mp3(mp3_file)
    
    # Exportation du fichier en format WAV
    audio.export(wav_file, format="wav")

#si le fichier est un fichier mp3
def is_mp3(filename):
    return filename.lower().endswith('.mp3')