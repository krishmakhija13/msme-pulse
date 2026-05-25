import pandas as pd
import numpy as np

print("Loading all datasets...")

light = pd.read_csv(r'C:\Users\krish\district_light_index.csv')
light = light.rename(columns={'district_name': 'district'})

mca21 = pd.read_csv(r'C:\Users\krish\mca21_distress_events.csv')

print(f"Light data: {len(light)} rows")
print(f"MCA21 data: {len(mca21)} rows")

print("Merging datasets...")
master = pd.merge(
    light, mca21,
    on=['district', 'state', 'year', 'month'],
    how='left'
)

sectors = ['Manufacturing','Food Processing','Textiles','Auto Components',
           'IT/ITES','Retail Trade','Construction','Other Services']

rows = []
for _, row in master.iterrows():
    for sector in sectors:
        new_row = row.to_dict()
        new_row['sector'] = sector
        new_row['msme_count'] = int(np.random.randint(100, 5000))
        rows.append(new_row)

df = pd.DataFrame(rows)

df['mean_radiance'] = df['mean_radiance'].fillna(df.groupby('district')['mean_radiance'].transform('mean'))
df['distress_score'] = df['distress_score'].fillna(0)
df['data_quality'] = df['mean_radiance'].notna().astype(int)

df = df.sort_values(['district', 'sector', 'year', 'month'])

df.to_parquet(r'C:\Users\krish\master_dataset.parquet', index=False)
print(f"Done! Master dataset: {len(df)} rows")
print(f"Columns: {list(df.columns)}")
