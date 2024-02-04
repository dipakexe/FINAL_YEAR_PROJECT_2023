from flask import Blueprint, render_template

home_blueprint = Blueprint("home", __name__)


@home_blueprint.get("/")
def home_page():
    return render_template("index.html")
