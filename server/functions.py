import numpy as np
from scipy import signal
# import matplotlib.pyplot as plt

# ----------------------------------------------------------------------------------------------------------------------#
# generate_z_filter function description:
#      function to generate z filter from zeros and poles
#       Arguments: zeros , poles
#       Return: frequency of the filter(x_axis) , magnitude response of the filter , phase response of the filter
def generate_z_filter(zeros,poles):
    # w is frequencies normalized to the range [0, pi) 
    # h is frequency response
    w, h = signal.freqz_zpk(zeros, poles,1)
    # calculating magnitude and phase response
    magnitude = 20 * np.log10(abs(h))
    angles = np.unwrap(np.angle(h))
    return w,magnitude,angles

# ----------------------------------------------------------------------------------------------------------------------#
# filter_signal function description:
#      function to filter signal by difference equation
#       Arguments: zeros , poles ,signal
#       Return: filtered signal
def filter_signal(zeros,poles,sig):
    # polynomial transfer function representation from zeros and poles
    b , a = signal.zpk2tf(zeros,poles,1)
    # apply filter by difference equation on signal
    # calculate initial conditions
    zi = signal.lfilter_zi(b, a)
    # apply filter
    z, _ = signal.lfilter(b, a, sig, zi=zi*sig[0])
    return z

# ----------------------------------------------------------------------------------------------------------------------#
# generate_all_pass_filter function description:
#      function to generate all pass filter by zeros and poles
#       Arguments: a (all pass filter coefficient)
#       Return: frquency , all pass filter phase response
def generate_all_pass_filter(a):
    p = a
    z = 1/np.conj(a)
    w, h = signal.freqz_zpk(z, p, 1 )
    # calculating phase response
    angles = np.unwrap(np.angle(h))
    return w  , angles

# ----------------------------------------------------------------------------------------------------------------------#
# getAllPassFrequencyResponse function description:
#      function to generate all pass filter by a (all pass filter coefficient) , zeros and poles
#       Arguments: z(zeros) , p(poles) , a (all pass filter coefficient)
#       Return: frquency , phase response of the filter
def getAllPassFrequencyResponse(z , p , a ):
    # take a copy of zeros and poles
    zeros = z[:]
    poles = p[:]
    # add all pass zeros and poles
    for x in a :
        a_value = eval(x["A"])
        poles.append(a_value)
        zeros.append(1/np.conj(a_value))
    #generate filter 
    freq ,magnitude ,angles =   generate_z_filter(zeros,poles)
    return freq , angles

# ----------------------------------------------------------------------------------------------------------------------#
# pairs_to_complex function description:
#      function to change pairs of zeros and poles to complex number
#       Arguments: pairs
#       Return: complexNumbers
def pairs_to_complex(pairs):
    # complex_numbers = [0]*len(pairs)
    complex_numbers = []
    for i in range(len(pairs)):
        print(eval(pairs[i]["x"]))
        x = round(eval(pairs[i]["x"]), 2)
        y = round(eval(pairs[i]["y"]), 2)
        complex_numbers.append(np.complex(x,y))
        # print("C"*60)
        # print(complex_numbers)
    return complex_numbers

def complex_to_pairs(complex_num):
    pairs = []
    for num in complex_num:
        z_pair = {"x": num.real ,"y" : num.imag }
        pairs.append(z_pair)
    return pairs