import numpy as np
from scipy import signal
import matplotlib.pyplot as plt


def generate_z_filter(zeros,poles):
    # zero pole filter
    # w is frequencies normalized to the range [0, pi) 
    # h is frequency response
    w, h = signal.freqz_zpk(zeros, poles,1, fs=1000 )
    # calculating magnitude and phase response
    magnitude = 20 * np.log10(abs(h))
    angles = np.unwrap(np.angle(h))
    return w,magnitude,angles

def filter_signal(zeros,poles,sig):
    # filter coefficients
    # polynomial transfer function representation from zeros and poles
    b , a = signal.zpk2tf(zeros,poles,1)
    # apply filter by difference equation on signal
    zi = signal.lfilter_zi(b, a)
    z, _ = signal.lfilter(b, a, sig, zi=zi*sig[0])
    # y = signal.lfilter(b, a, sig)
    return z

def generate_all_pass_filter(a):
    p=a
    z =[1/np.conj(x) for x in a]
    w, h = signal.freqz_zpk(z, p, 1 )
    angles = np.unwrap(np.angle(h))
    return w  , angles



def getAllPassFrequencyResponse(z , p , a ):
    zeros = z[:]
    poles = p[:]
    for x in a :
        poles.append(x)
        zeros.append(1/np.conj(x))
    print(zeros)
    print(poles)
        
    freq ,magnitude ,angles =   generate_z_filter(zeros,poles)
    return freq,magnitude,angles


def addAllPassZerosPoles(z , p , a ):
    zeros = z[:]
    poles = p[:]
    for x in a :
        poles.append(x)
        zeros.append(1/np.conj(x))
    return zeros,poles

def parseToComplex(pairs):
    complexNumbers = [0]*len(pairs)
    for i in range(len(pairs)):
        x = round(pairs[i]["x"], 2)
        y = round(pairs[i]["y"], 2)
        complexNumbers[i] = x+ y*1j
    return complexNumbers
