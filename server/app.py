# Description: This file contains the Flask APIs that receives files from the client and saves it in the server.

from flask import Flask, request, send_from_directory
from flask_cors import CORS
from functions import *

# ----------------------------------------------------------------------------------------------------------------------#
# Configurations
app = Flask(__name__)

CORS(app)

# zeros = [0]
# poles = [0]
# --------------------------------------------------------APIs----------------------------------------------------------#

# ----------------------------------------------------------------------------------------------------------------------#
# API description:
#       Fuction: generete z filter
#       Return: frequency response of the filter , magnitude response of the filter , phase response of the filter

@app.route("/api/get_zeros_poles", methods=['POST'])
def generate_filter():
    global  zeros 
    global  poles

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
    print(zeros)
    print(poles)
    signal = data["signalPositionY"]
    print(signal)
    filtered_signal = filter_signal(zeros,poles,signal)
    print(filtered_signal)
    return {"filtered_signal" :list(abs(filtered_signal))},200

# ----------------------------------------------------------------------------------------------------------------------#
# API description:
#       Fuction: generate all pass filter
#       Return: all pass filter phase response

@app.route("/api/all_pass_filter", methods=['POST'])
def generate_all_pass():
    # get request data
    data = request.get_json()
    # print(zeros)
    # print(poles)
    a_value = data["aValue"]
    print(a_value)
    a_value =  eval(a_value)
    print(a_value)
    print(type(a_value))

    w  , angles = generate_all_pass_filter(a_value)
    print("Done")
    a_val = f"{a_value}"

    return {"frequency" : list(w),"aValue" :a_val, "all_pass_phase_response" :list(angles)} , 200


# ----------------------------------------------------------------------------------------------------------------------#
# API description:
#       Fuction: generate all pass filter frequency response
#       Return: all filter phase response

@app.route("/api/all_pass_filter", methods=['POST'])
def update_filter():
    # get request data
    data = request.get_json()
    print(zeros)
    print(poles)
    a_values = data["a"]
    print(a_values)

    w, magnitude, angles = getAllPassFrequencyResponse(zeros , poles , a_values )

    return {"freq" :list(w), "filter_phase_response" :list(angles)} , 200
