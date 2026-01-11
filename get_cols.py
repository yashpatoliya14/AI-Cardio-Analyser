import pandas as pd
df = pd.read_csv('data/cardio_cleaned.csv')
with open('cols.txt', 'w') as f:
    f.write(str(list(df.columns)))
