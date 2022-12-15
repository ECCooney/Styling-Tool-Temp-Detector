# Style-Control
<h2>Overview</h2>

This project is a heated styling tool monitoring and control system built using a Raspberry Pi, Sense HAT, and a TP-Link Kasa Smart Plug.

The Raspberry Pi collects temperature data every 10 minutes and at all times will have the last hour's worth of data stored. Based on these readings, the Pi will determine whether a heated device has been left on/heated for over 100 minutes, and if so, will automatically turn the device off.

The data is viewable in a Blynk application, which shows the current temp, the temperature history, and the current device state. The installed Blynk application will also send the user a push notification when the device has automatically switched off as described above.

As an optional extra, the data can also be published to the Thingspeak platform using the MQTT protocol. This data is then accessed and displayed in graph format to a companion web application, which can allow users to monitor multiple devices. This web app has been developed in Glitch. You can view the code for this here: https://glitch.com/~style-control or in the Glitch branch of this repo.

Glitch Web App          |  Blynk Mobile App
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/95751749/207833988-5e99a662-ae00-43e1-b25a-cc633b5c9518.PNG)  |  ![](https://user-images.githubusercontent.com/95751749/207882467-3931b25c-03fb-4a56-8e5a-95e71dcaf66c.JPG)

If you'd like to get an idea of what the web application for a user with registered devices looks like, you can log in using the credentials:
emai: homer@simpson.com
password: secret

<h2>Setup</h2>

At the command line, you'll need to install the following:
```
sudo pip install python-kasa
sudo pip3 install paho-mqtt
sudo pip3 install python-dotenv
sudo apt-get install sense-hat
sudo pip install https://bit.ly/3C0PMVY
```
Connect the Sense HAT to the Raspberry Pi by placing it on the GPIO pins and reboot your Raspberry Pi.

<h2>How to use</h2>

In order to get a baseline temperature, when the device first starts, you should run baseTemp.py for 5 minutes. This will give you an average baseline temp to use in your program. In senseControlpi.py adjust the code where it reads 
```
if avgTemp > 50 and startTemp > 50 and tempNow > 50:
```
to factor if your average temp.

The following assumes you have set up your device on both ThingSpeak and Blynk. This includes setting up an event on Blynk for your device. The event code should be "still_on"

To proceed you will need a list of credentials for your device that includes Client ID, username and password from Thingspeak. This can be downloaded from ThingSpeak as a plain text file. You will also need your auth key from Blynk (located in the device info tab).

Create a file called .env in your directory. Copy your credentials from the plain text file into this directory.

Then add the ThingSpeak channel id for your device. Finally, add a transmission interval to the file. This will determine how frequently sensor data is published to ThingSpeak.

Your dot env file should look like this, including the neccessary data:
```
username = -----------------------
clientId = -----------------------
password = -----------------------
channelId = --------
transmissionInterval = 60
blynkauth = -----------------------
```
To test that your program is working correctly, turn your device on, and run test.py. If configured correctly, the device will turn off in about 10 seconds and you should be able to view the data within your Blynk application.

Once you're confident that all is set up correctly, you can run styleControlpi.py and leave it running.








