# Description: This file contains the Flask APIs that receives files from the client and saves it in the server.

from flask import Flask, request, send_from_directory
from flask_cors import CORS
from functions import *

# ----------------------------------------------------------------------------------------------------------------------#
# Configurations
app = Flask(__name__)

CORS(app)

# zeros = []
# poles = []
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
    # get zeros and poles from request data
    zeros_pairs = data["zeros"]
    poles_pairs = data["poles"]
    # convert zeros and poles to complex numbers
    zeros = pairs_to_complex(zeros_pairs)
    poles = pairs_to_complex(poles_pairs)
    # generate filter from zeros and poles
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
    # get signal from request data
    signal = data["signalPositionY"]
    # filter signal
    filtered_signal = filter_signal(zeros,poles,signal)
    return {"filtered_signal" :list(abs(filtered_signal))},200

# ----------------------------------------------------------------------------------------------------------------------#
# API description:
#       Fuction: generate all pass filter
#       Return: all pass filter phase response

@app.route("/api/all_pass_filter", methods=['POST'])
def generate_all_pass():
    # get request data
    data = request.get_json()
    # get a value from request data
    a_value = data["aValue"]
    a_value =  eval(a_value)
    # generate all pass filter
    w  , angles = generate_all_pass_filter(a_value)
    a_val = f"{a_value}"
    return {"frequency" : list(w),"aValue" :a_val, "all_pass_phase_response" :list(angles)} , 200


# ----------------------------------------------------------------------------------------------------------------------#
# API description:
#       Fuction: generate all pass filter frequency response
#       Return: all filter phase response

@app.route("/api/all_pass_filter_response", methods=['POST'])
def update_filter():
    global  zeros 
    global  poles
    # get request data
    data = request.get_json()
    a_values = data["aValueList"]
    # get filter phase response from zeros and poles and a values
    freq, angles = getAllPassFrequencyResponse(zeros , poles , a_values )
    return {"filter_phase_response" :list(angles)} , 200
