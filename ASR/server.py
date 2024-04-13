from flask import Flask, request, jsonify
from core.recognize_processor import recognize_speech_from_audio
import os
from flask import send_file
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'data'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/recognize', methods=['POST'])
def recognize_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'Aucun fichier trouvé'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'Aucun fichier sélectionné'}), 400
    
    if file:
         
        filename = file.filename
        print("file name : " + filename)
        #si le fichier contient pas .wav on le renomme
        if not filename.endswith('.wav'):
            filename = filename + '.wav'
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        print(f"Fichier audio enregistré : {file_path}")
        text = recognize_speech_from_audio(file_path)
        try:
            files = os.listdir(app.config['UPLOAD_FOLDER'])
            for f in files:
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], f))
                print(f"Fichier audio supprimé : {f}")
        except Exception as e:
            print(f"Erreur lors de la suppression du fichier audio : {e}")
        if text:
            print("text reconnu : " + text)
            return jsonify({'text': text}), 200
        else:
            return jsonify({'error': 'Erreur lors de la reconnaissance vocale'}), 500

@app.route('/', methods=['GET'])
def index():
    return send_file('public/index.html', mimetype='text/html; charset=utf-8')
if __name__ == '__main__':
    app.run(debug=True, host='172.20.10.12')
