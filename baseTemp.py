from sense_hat import SenseHat
import time

sense = SenseHat()
sense.clear
temp_array = []  #initialise an array to store temps
timeout = 300
timeout_start = time.time()

while time.time() < timeout_start + timeout:
    baseTemp = round(sense.get_temperature(),2)
    print (baseTemp)
    temp_array.append(baseTemp)
    time.sleep(30)
    baseAvg = sum(temp_array) / len(temp_array)
    print (baseAvg)
