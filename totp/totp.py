import sys
import math
import time

import hmac
import hashlib
import base64
import struct

class TOTP:

    def getCounter(self):
        currTime = time.time()
        temp = math.floor( (currTime - 0) / self.ga.timeStep)
        return temp

    
    def getHash(self):
        key = self.ga.secret
        counter = self.getCounter()
        
        k = base64.b32decode(key)
        counterArr = [counter -1, counter, counter + 1]
        
        binary = ["","",""]
        for i in range(3):
            counter = struct.pack('>q', counterArr[i])
            myHash = hmac.new(k, counter, hashlib.sha1)
            myByteArrayHash = bytearray(myHash.digest())

            binaryArr = []
            for c in myByteArrayHash:
                bits = bin(c)[2:]
                bits = '00000000'[len(bits):] + bits
                binaryArr.extend([int(b) for b in bits])

            for j in binaryArr:
                binary[i] += str(j)

        return binary

    def truncate(self, s):
        newS = []
        for i in s:
            lastFour = i[len(i)-4:]
            offset = int(lastFour, 2)
            charOffset = (offset * 8) + 1
            newS.append(i[charOffset:charOffset+31])

        return newS


    def start(self):
        hotp = self.truncate( self.getHash())

        hotp[0] = int(hotp[0], 2)
        hotp[0] = hotp[0] % (pow(10, 6))
        self.prevCode = '000000'[len(str(hotp[0])):] + str(hotp[0])

        hotp[1] = int(hotp[1], 2)
        hotp[1] = hotp[1] % (pow(10, 6))
        self.code = '000000'[len(str(hotp[1])):] + str(hotp[1])
        
        hotp[2] = int(hotp[2], 2)
        hotp[2] = hotp[2] % (pow(10, 6))
        self.nextCode = '000000'[len(str(hotp[2])):] + str(hotp[2])

    def __init__(self, ga):
        self.ga = ga

class GoogleAuth:

    # def generateQR(self):
    #     s = "otpauth://totp/Provider1:" + self.email + "?secret=" + self.secret + "&issuer=Provider1"
    #     url = pyqrcode.create(s) 
    #     url.svg("QR-Code.svg", scale = 8) 

    
    def getOTP(self):
        otp = TOTP(self)
        # while True:
        #     otp.start()
        #     print(otp.prevCode[:3] + " " + otp.prevCode[3:] + "%" + otp.code[:3] + " " + otp.code[3:] + "&" + otp.nextCode[:3] + " " + otp.nextCode[3:])
        #     time.sleep(30)
        otp.start()
        print(otp.prevCode[:3] + " " + otp.prevCode[3:] + "&" + otp.code[:3] + " " + otp.code[3:] + "&" + otp.nextCode[:3] + " " + otp.nextCode[3:] + "!")
            


    def __init__(self, time, length, email, secret):
        self.timeStep = time
        self.passwordLen = length
        self.email = email
        self.secret = secret



email = sys.argv[2]
secret = sys.argv[3]

if len(sys.argv) == 4:
    ga = GoogleAuth(30, 6, email, secret)
    arg = sys.argv[1]

    if arg == "generate":
        ga.generateQR()

    elif arg == "get":
        ga.getOTP()

