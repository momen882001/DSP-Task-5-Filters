import numpy as np
import matplotlib.pyplot as plt

zeros = [-0.999+4.517j ,-0.99999-4.51742j ,-1.000+00j]

poles = [-0.916038+0.12564j ,0.916038-0.12564j ,-0.854080-0.0j]  

def plotHejw(zeros=[], poles=[], A=1, N_M=0):
    "H(ejw) = Ae^(jw N_M) (ejw-z)/(ejw-p)"
    poles = np.array(poles)
    zeros = np.array(zeros)
    W = np.linspace(-np.pi, np.pi,100)
    H = A * np.exp(1j*W)**N_M
    for z in zeros:
        H *= (np.exp(1j*W)-z)
    for p in poles:
        H /= (np.exp(1j*W)-p)
    magH= np.abs(H)
    phaseH= np.angle(H)
    plt.figure()
    plt.plot(W, magH)
    plt.grid()
    plt.figure()
    plt.plot(W, phaseH)
    plt.grid()
    return


plotHejw(zeros, poles)