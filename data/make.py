import csv
import json

data = {
  'type': 'FeatureCollection',
  'features':[]
}

source = csv.reader(open('earthquakes.csv', 'rb'), delimiter=',')

for i in source:
  data['features'].append({
    'geometry': {
      'type':'Point',
      'coordinates':[i[5], i[4]]
    },
    'properties': {
      'src':i[0],
      'eqid':i[1],
      'version':i[2],
      'datetime':i[3],
      'magnitude':i[6],
      'depth':i[7],
      'nst':i[8],
      'region':i[9]
    }
  })

f = open('earthquakes.json', 'w')
f.write(json.dumps(data, separators = (',', ':'), indent=2) + ';')
f.close();
