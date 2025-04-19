import pandas as pd
teams = pd.read_csv('Fantrax-Team-Roster-League Against Humanity.csv')
teams['points'] = 0
teams_json = teams.to_json('src/app/scieries.json', orient='records')
# dump json
with open('src/app/scieries.json', 'w') as f:
    f.write(teams_json)