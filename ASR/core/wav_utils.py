import soundfile as sf
import subprocess
def mp3_to_wav(mp3_file, wav_file):
    # Ouvre le fichier MP3 et le lit
    audio_data, samplerate = sf.read(mp3_file)
    # Sauvegarde les données audio au format WAV
    sf.write(wav_file, audio_data, samplerate, subtype='PCM_16')

#si le fichier est un fichier mp3
def is_mp3(filename):
    return filename.lower().endswith('.mp3')

def repare_wav(wav_file):
    try:
        # Construction de la commande FFmpeg
        command = ['ffmpeg', '-i', wav_file, "data/repare.wav"]
        
        # Exécution de la commande
        subprocess.run(command, check=True)
        
        print("Conversion réussie !")
        return "data/repare.wav"
    except subprocess.CalledProcessError as e:
        print("Une erreur est survenue lors de la conversion :", e)