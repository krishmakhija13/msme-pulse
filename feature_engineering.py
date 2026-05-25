import pandas as pd
import numpy as np

print("Loading master dataset...")
df = pd.read_parquet(r'C:\Users\krish\master_dataset.parquet')
print(f"Loaded {len(df)} rows")

df = df.sort_values(['district', 'sector', 'year', 'month'])

print("Creating lag features...")
for col in ['mean_radiance', 'distress_score']:
    for lag in [1, 3, 6, 12]:
        df[f'{col}_lag{lag}'] = df.groupby(['district','sector'])[col].shift(lag)

print("Creating rolling features...")
for col in ['mean_radiance', 'distress_score']:
    for window in [3, 6]:
        df[f'{col}_roll_mean_{window}'] = df.groupby(['district','sector'])[col].transform(lambda x: x.rolling(window).mean())
        df[f'{col}_roll_std_{window}'] = df.groupby(['district','sector'])[col].transform(lambda x: x.rolling(window).std())

print("Creating delta features...")
df['radiance_mom_change'] = df.groupby(['district','sector'])['mean_radiance'].pct_change()
df['radiance_yoy_change'] = df.groupby(['district','sector'])['mean_radiance'].pct_change(12)
df['distress_mom_change'] = df.groupby(['district','sector'])['distress_score'].pct_change()

print("Creating seasonal features...")
df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
df['is_diwali'] = df['month'].isin([10, 11]).astype(int)
df['is_yearend'] = df['month'].isin([2, 3]).astype(int)

print("Creating interaction features...")
df['radiance_x_distress'] = df['mean_radiance'] * df['distress_score']
df['msme_x_distress'] = df['msme_count'] * df['distress_score']
df['msme_x_radiance'] = df['msme_count'] * df['mean_radiance']

print("Creating sector dummies...")
sector_dummies = pd.get_dummies(df['sector'], prefix='sector')
df = pd.concat([df, sector_dummies], axis=1)

print("Creating target variable...")
df['distress_next_6m'] = df.groupby(['district','sector'])['distress_score'].transform(
    lambda x: x.shift(-6)
)
df['target'] = (df['distress_next_6m'] > df['distress_score'].quantile(0.75)).astype(int)

print("Cleaning up...")
df = df.replace([np.inf, -np.inf], np.nan)
df['data_quality'] = df['mean_radiance'].notna().astype(int)

df.to_parquet(r'C:\Users\krish\feature_matrix.parquet', index=False)
print(f"Done! Feature matrix: {len(df)} rows x {len(df.columns)} columns")
print("Features created:", len(df.columns))
