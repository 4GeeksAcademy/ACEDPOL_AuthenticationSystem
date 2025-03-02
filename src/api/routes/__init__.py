"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import jsonify, Blueprint
from flask_cors import CORS

from api.routes.user_routes import user_api

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# Register API models routes:
api.register_blueprint(user_api) # /api/users


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200
