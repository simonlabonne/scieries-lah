import pandas as pd
teams = pd.read_csv('Fantrax-Team-Roster-League Against Humanity.csv')
teams['points'] = 0
teams.to_json('scieries.json', orient='records')