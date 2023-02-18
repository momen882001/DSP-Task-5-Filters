# Real Time Digital Filter Designer || DSP-Task-5
>  Real Time Digital Filter Designer is a digital signal processing **WebApp** that helps users to design a custom **Digital Filter** via zeros-poles placement on the **Z-plane** and **All-Pass** library for phase correction.
## Table of contents:

- [Work Process](#Digital-Filter-Principles)
- [Project Features](#project-features)
- [Project full Demo](#project-full-demo)
- [Project Structure](#project-structure)
- [How to Run The Project](#run-the-project)
- [Team](#team)

### Digital Filter Principles
> Real Time Digital Filter is an application of the **Z** Transform to design filter from zeros and poles placement on the z-plane.
#### Z Transform Equation
$$ X(z)=\sum_{n=-\infty}^{\infty} x[n] z^{-n} $$
$$ Z=r e^{j \omega} $$

#### To calculate filter magnitude gain
$$ \frac{|Y(z)|}{|X(z)|}=|H(z)|=\frac{\left|\left(z-\xi_1\right)\right|\left|\left(z-\xi_2\right)\right|\left|\left(z-\xi_3\right)\right| \ldots\left|\left(z-\xi_N\right)\right|}{\left|\left(z-p_1\right)\right|\left|\left(z-p_2\right)\right|\left|\left(z-p_3\right)\right| \ldots\left|\left(z-p_N\right)\right|} =\frac{l_1 * l_2 * l_3 \ldots * l_N}{d_1 * d_2 * d_3 \ldots * d_N} $$

![Z filter](https://user-images.githubusercontent.com/84602951/219867200-61c0acca-642f-4741-a564-ed21716853ae.png)

#### The filter implementation depends on difference equation and Taylor's theorem :

$$ H(z)=\frac{Y(z)}{X(z)}=\frac{b_0+b_1 z^{-1}+b_2 z^{-2}+\cdots+b_N z^{-N}+\cdots}{1+a_1 z^{-1}+a_2 z^{-2}+\cdots+a_N z^{-N}+\cdots} $$

#### The filter response
$$ \begin{gathered} y(n)=b_0 x(n)+b_1 x(n-1)+b_2 x(n-2)+\cdots+b_N x(n-N)+\cdots \\+a_1 y(n-1)+a_2 y(n-2)+\cdots+a_N y(n-N)+\cdots\end{gathered} $$

#### All-pass filters for the phase distortion
* The main problem with real time digital filters is the phase distortion.
* All-pass filters are used to :
    * Correct/adjust the phase,
    * Switch the zeros/poles of the system to maintain causality/stability/min phase.
* All Pass filter with *$a$* value means pole at $a$ and zero at $ 1 / a^*$

$$ H_{a p}(z)=\frac{z^{-1}-a^*}{1-a z^{-1}}=\frac{1-a^* z}{z-a} $$


### Project Features