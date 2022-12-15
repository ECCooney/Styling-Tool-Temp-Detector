import asyncio
import BlynkLib
import time
from kasa import SmartPlug
from sense_hat import SenseHat
from dotenv import dotenv_values

sense = SenseHat()
sense.clear
temp_array = [0] * 10  #initialise an array to store temps
plug = SmartPlug("YOUR KASA PLUG IP") #kasa plug

#load auth token values from .env file
config = dotenv_values(".env")

#auth details for Blynk
BLYNK_AUTH = 'config["blynkauth"]'
blynk = BlynkLib.Blynk(BLYNK_AUTH)

#loop which gathers the data, publishes to Blynk and switches the plug off if it's been on too long, then notifies the user that this has occured
async def main():

    while True:
        await plug.update()
        time.sleep(0.5)
        blynk.run()
        temp = round(sense.get_temperature(),2)

        if plug.is_on:
            blynk.virtual_write(2, "Plug is On")  #send time turned on to blynk (reads as "plug is off" if not on)
        if plug.is_off:
            blynk.virtual_write(2, "Plug is Off")

        blynk.virtual_write(1, temp)   #send real time temp to blynk for reading and chart widgets

        for pos in range( 9, 0, -1): temp_array[pos] = temp_array[pos-1] # move data along array
        temp_array[0] = temp   #store new temp
        time.sleep(1)
        avgTemp = 0   #set initial avg temp
        for pos in range(10): avgTemp += temp_array[pos] #get all temps in array
        avgTemp /= 10
        print ("avg", avgTemp)
        startTemp = temp_array[9]
        tempNow = temp_array[0]
        print ("start", startTemp)
        print ("now", tempNow)

        if avgTemp > 0 and startTemp > 0 and tempNow > 0:  #if the temp has been over X for 90 mins and is still reading at that temp
            blynk.log_event("still_on")  #sends push notifiation to Blynk app
            await plug.turn_off()  # Turn the device off
            continue

if __name__ == "__main__":
    asyncio.run(main())
