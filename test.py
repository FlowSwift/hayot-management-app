import requests
import time

for i in range(1000):
    time.sleep(.1)    
    print(requests.get('http://localhost:5000/'))
    print(i)
    