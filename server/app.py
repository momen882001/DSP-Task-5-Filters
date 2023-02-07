# Description: This file contains the Flask APIs that receives files from the client and saves it in the server.

from flask import Flask, request, send_from_directory
from flask_cors import CORS
from functions import *

# ----------------------------------------------------------------------------------------------------------------------#
# Configurations
app = Flask(__name__)

CORS(app)

global  zeros 
global  poles

# --------------------------------------------------------APIs----------------------------------------------------------#

# ----------------------------------------------------------------------------------------------------------------------#
# API description:
#       Fuction: generete z filter
#       Return: frequency response of the filter , magnitude response of the filter , phase response of the filter

@app.route("/api/get_zeros_poles", methods=['POST'])
def generate_filter():

    # get request data
    data = request.get_json()
    zeros_pairs = data["zeros"]
    poles_pairs = data["poles"]
    print("z"*100)
    print(zeros_pairs)
    zeros = parseToComplex(zeros_pairs)
    print(zeros)
    print(type(zeros))
    poles = parseToComplex(poles_pairs)
    print("p"*100)
    print(poles_pairs)
    print(poles)
    w,magnitude,angles = generate_z_filter(zeros,poles)
    return {"freq" :list(w), "magnitude" :list(magnitude), "angles": list(angles)},200

# ----------------------------------------------------------------------------------------------------------------------#
# API description:
#       Fuction: filter signal
#       Return: filtered signal
@app.route("/api/filtering_signal", methods=['POST'])
def filtering_signal():

    # get request data
    data = request.get_json()
    signal = data["signal"]

    filtered_signal = filter_signal(zeros,poles,signal)

    return {"filtered_signal" :list(filtered_signal)},200
