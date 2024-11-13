"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from api.models import db, User, Friendship, Profile


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.config["JWT_SECRET_KEY"] = "super-secret"  # ¡Cambia las palabras "super-secret" por otra cosa!
jwt = JWTManager(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User id doesn't exist"}), 404
    response_body = user.serialize()
    return jsonify(response_body), 200

@app.route('/user/<int:id>/friends', methods=['GET'])
def get_user_friends(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User id doesn't exist"}), 404
    friends_ids = [friendship.friend_id for friendship in user.friendships if friendship.is_active]
    return jsonify({"friends": friends_ids}), 200

@app.route('/profile/<int:id>', methods=['GET'])
def get_profile(id):
    profile = Profile.query.get(id)
    if not profile:
        return jsonify({"error": "This profile doesn't exist"}), 404
    response_body = profile.serialize()
    return jsonify(response_body), 200

@app.route('/profile/<int:id>', methods=['PUT'])
def modify_profile(id):
    data = request.get_json()
    profile = Profile.query.get(id)
    if not profile:
        return jsonify({"error": "This profile doesn't exist"}), 404
    img_url = data.get('image_url')
    if img_url is not None:
        profile.img_url = img_url
    description = data.get('description')
    if description is not None:
        profile.description = description
    birthdate = data.get('birthdate')
    if birthdate is not None:
        profile.birthdate = birthdate
    db.session.commit()
    return jsonify(profile.serialize()), 200
 

@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    response_body = [user.serialize() for user in users]
    return jsonify(response_body), 200

@app.route('/friendship', methods=['POST'])
def add_friendship():
    data = request.get_json()
    user_id = data.get('user_id')
    friend_id = data.get('friend_id')
    if not user_id or not friend_id:
        return jsonify({"error": "user_id and friend_id are required"}), 400
    existing_friend = Friendship.query.filter_by(user_id=user_id, friend_id=friend_id).first()
    if existing_friend:
        return jsonify({"error": "This friendship already exists"}), 409
    if user_id == friend_id:
        return jsonify({"error": "User and friend can't have the same id"}), 400
    friendship = Friendship(user_id=user_id, friend_id=friend_id)
    db.session.add(friendship)
    db.session.commit()
    return jsonify(friendship.serialize()), 200

@app.route('/friendship', methods=['DELETE'])
def delete_friendship():
    data = request.get_json()
    user_id = data.get('user_id')
    friend_id = data.get('friend_id')
    if not user_id or not friend_id:
        return jsonify({"error": "user_id and friend_id are required"}), 400
    friendship = Friendship.query.filter_by(user_id=user_id, friend_id=friend_id).first()
    if not friendship:
        return jsonify({"error": "This friendship doesn't exist"}), 404
    db.session.delete(friendship)
    db.session.commit()
    return jsonify({"success": "Friendship was correctly deleted"}), 200

@app.route('/friendship', methods=['PUT'])
def update_friend():
    data = request.get_json()
    user_id = data.get('user_id')
    friend_id = data.get('friend_id')
    if not user_id or not friend_id:
        return jsonify({"error": "user_id and friend_id are required"}), 400
    friendship = Friendship.query.filter_by(user_id=user_id, friend_id=friend_id).first()
    if not friendship:
        return jsonify({"error": "This friendship doesn't exist"}), 404
    if friendship.is_active == True:
        friendship.is_active = False
    else:
        friendship.is_active = True
    db.session.commit()
    return jsonify(friendship.serialize()), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
