# Description: This file contains the Flask APIs that receives files from the client and saves it in the server.

from flask import Flask, request, send_from_directory
from flask_cors import CORS
from functions import *

# ----------------------------------------------------------------------------------------------------------------------#
# Configurations
app = Flask(__name__)

CORS(app)


# --------------------------------------------------------APIs----------------------------------------------------------#

# ----------------------------------------------------------------------------------------------------------------------#
# API description:
#       Fuction: Upload the file to the server
#       Return: File URL

@app.route("/api/get_zeros_poles", methods=['POST'])
def generate_filter():

    # check if the post request has the file part

    # get request data
    data = request.get_json()
    zeros = data["zeros"]
    poles = data["poles"]
    print("z"*100)
    print(zeros)
    z = parseToComplex(zeros)
    print(z)
    print(type(z))
    p = parseToComplex(poles)
    print("p"*100)
    print(poles)
    print(p)

    w,magnitude,angles = generate_z_filter(z,p)

    return {"freq" :list(w), "magnitude" :list(magnitude), "angles": list(angles)},200