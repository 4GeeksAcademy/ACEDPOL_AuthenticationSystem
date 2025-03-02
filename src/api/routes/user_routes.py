from flask import Blueprint, request, jsonify
from api.models import db, User


user_api = Blueprint('user_api', __name__)


@user_api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [user.serialize() for user in users]
    return jsonify(users_list), 200


@user_api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user.serialize()), 200


@user_api.route('/users', methods=['POST'])
def create_user():
    body = request.get_json()
    new_user = User(email=body['email'], password=body['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201


@user_api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    body = request.get_json()
    user = User.query.get(id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404
    user.email = body.get('email', user.email)
    user.password = body.get('password', user.password)
    db.session.commit()
    return jsonify(user.serialize()), 200


@user_api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"msg": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted"}), 200


@user_api.route('/reset_users', methods=['POST'])
def reset_users():
    try:
        # Eliminar todos los registros de la tabla User
        User.query.delete()
        db.session.commit()

        # Reiniciar el contador de id en PostgreSQL
        db.session.execute("ALTER SEQUENCE user_id_seq RESTART WITH 1")
        db.session.commit()

        return jsonify({"msg": "Todos los usuarios han sido eliminados y el contador de ID ha sido reiniciado"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500