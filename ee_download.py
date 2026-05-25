import ee
import pandas as pd

ee.Initialize(project='msme-pulse-497321')

print("Connected to Earth Engine!")
print("Loading India districts...")

india = ee.FeatureCollection("FAO/GAUL/2015/level2").filter(ee.Filter.eq('ADM0_NAME', 'India'))

viirs = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG").select('avg_rad')

results = []

for year in range(2019, 2025):
    for month in range(1, 13):
        print(f"Processing {year}-{month:02d}...")
        start = f"{year}-{month:02d}-01"
        end = f"{year}-{month:02d}-28"
        
        img = viirs.filterDate(start, end).mean()
        
        stats = img.reduceRegions(
            collection=india,
            reducer=ee.Reducer.mean(),
            scale=500
        ).getInfo()
        
        for feat in stats['features']:
            props = feat['properties']
            results.append({
                'district_name': props.get('ADM2_NAME', 'Unknown'),
                'state': props.get('ADM1_NAME', 'Unknown'),
                'year': year,
                'month': month,
                'mean_radiance': props.get('mean', 0)
            })

df = pd.DataFrame(results)
df = df.sort_values(['district_name', 'year', 'month'])
df['delta_radiance'] = df.groupby('district_name')['mean_radiance'].diff()
df.to_csv(r'C:\Users\krish\district_light_index.csv', index=False)
print(f"Done! Saved {len(df)} rows to district_light_index.csv")
