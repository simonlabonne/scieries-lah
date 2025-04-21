# %%
import pandas as pd
import requests

# %%
teams = pd.read_csv('Fantrax-Team-Roster-League Against Humanity.csv')

# %%
def get_data(url):
    r = requests.get(url)
    return r.json()

# %%
compiler = []
start = 0
while True:
    data = get_data("https://api.nhle.com/stats/rest/en/skater/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22points%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22goals%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22assists%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22playerId%22,%22direction%22:%22ASC%22%7D%5D&start="+str(start)+"&limit=100&cayenneExp=gameTypeId=3%20and%20seasonId%3C=20242025%20and%20seasonId%3E=20242025")
    start += 100
    compiler.extend(data['data'])
    if len(data) < 100:
        break
start = 0
while True:
    data = get_data("https://api.nhle.com/stats/rest/en/goalie/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22wins%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22savePct%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22playerId%22,%22direction%22:%22ASC%22%7D%5D&start="+str(start)+"&limit=100&cayenneExp=gameTypeId=3%20and%20seasonId%3C=20242025%20and%20seasonId%3E=20242025")
    start += 100
    compiler.extend(data['data'])
    if len(data) < 100:
        break

# %%
nhl_stats = pd.DataFrame(compiler)
nhl_stats['skaterFullName'] = nhl_stats['skaterFullName'].fillna(nhl_stats['goalieFullName'])
nhl_stats = nhl_stats.drop(['points'], axis=1)

# %%
df_merge = pd.merge(nhl_stats, teams, how="outer", left_on="skaterFullName", right_on="player")
df_merge = df_merge.dropna(subset=['player'])
def calculate_points(row):
    if row['pos'] == 'G':
        return (row['wins'] * 2) + row['shutouts'] + row['assists'] + (row['goals'] * 10)
    if (row['pos'] == 'D' or row['pos'] == 'F'):
        return row['goals'] + row['assists']
df_merge['points'] = df_merge.apply(calculate_points, axis=1)
df_merge = df_merge.sort_values(by=['points'], ascending=False)
df_merge['points'] = df_merge['points'].fillna(0)

# %%
df_merge.to_json('scieries.json', orient='records')


