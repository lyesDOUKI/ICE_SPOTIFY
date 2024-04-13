from flask import Flask, request, jsonify
from core.nlp_process import analyser_requete
from flask import send_file
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/nlp-process', methods=['GET'])
def nlp_process():
    # Récupérer la requête GET
    requete = request.args.get('requete')
    
    # Vérifier si la requête est vide
    if not requete:
        return jsonify({'error': 'Veuillez fournir un texte à analyser.'}), 400
    
    # Analyser la requête
    action, objet = analyser_requete(requete)
    
    # Créer la réponse JSON
    response = {
        'action': action,
        'objet': objet
    }
    
    return jsonify(response)
@app.route('/', methods=['GET'])
def index():
    return send_file('public/index.html', mimetype='text/html; charset=utf-8')

if __name__ == '__main__':
    app.run(debug=True, host="172.20.10.12", port=8181)
