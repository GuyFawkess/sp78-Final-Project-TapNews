"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Profile

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

from flask_jwt_extended import create_access_token

@api.route('/signup', methods=['POST'])
def create_user():
    request_body = request.json
    user_query = User.query.filter_by(email = request_body["email"]).first()
    if user_query is None:
        create_user = User(username = request_body["username"], email = request_body["email"], password = request_body["password"])
        db.session.add(create_user)
        db.session.commit()

        #creacion del profile
        new_profile = Profile(
            bio="Este es el perfil de " + request_body["username"],  # Ejemplo de biografía predeterminada
            user_id=create_user.id
        )
        db.session.add(new_profile)
        db.session.commit()

        response_body = {
             "msg": "Usuario creado con exito"
            }
        return jsonify(response_body), 200
    else:
        response_body = {
             "msg": "Usuario existente"
            }
        return jsonify(response_body), 400

# Crea una ruta para autenticar a los usuarios y devolver el token JWT
# La función create_access_token() se utiliza para generar el JWT
@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # user = User(email=email, password=password)
    # db.session.add(user)
    # db.session.commit()
    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route ('/User', methods= ['GET'] )
@jwt_required()
def get_users():
    users = User.query.all()
    result = [user.serialize() for user in users]
    current_user_id = get_jwt_identity()
    print(current_user_id)
    return jsonify({"users": result}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
