import sys
import json
import requests

def get_scan_result(sentence):
    r = requests.post("http://localhost:4444/getString", data={'String': sentence})
    scan_result = json.loads(r.text)
    resultDict = []
    for elements in scan_result:
        tmp = {}
        tmp['scanId'] = elements
        resultDict.append(tmp)
    # print("result dict is")
    # print(resultDict)
    return scan_result, resultDict