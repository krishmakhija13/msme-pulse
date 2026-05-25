import os
import glob
import numpy as np
import pandas as pd
import geopandas as gpd
import rasterio
from rasterio.mask import mask
from shapely.geometry import mapping

shapefile_path = r"C:\Users\krish\maps-master\Districts\Census_2011\2011_Dist.shp"
viirs_folder = r"C:\Users\krish\viirs_raw"
output_csv = r"C:\Users\krish\district_light_index.csv"

print("Loading shapefile...")
districts = gpd.read_file(shapefile_path)
districts = districts.to_crs("EPSG:4326")
print(f"Columns in shapefile: {list(districts.columns)}")
print(f"Loaded {len(districts)} districts")

results = []
nc_files = glob.glob(os.path.join(viirs_folder, "*.nc"))
print(f"Found {len(nc_files)} VIIRS files")

for nc_file in nc_files:
    filename = os.path.basename(nc_file)
    parts = filename.split(".")
    year = int(parts[1][1:5])
    month = int(parts[1][5:7])
    print(f"Processing {filename}...")
    try:
        subdataset = f'HDF5:"{nc_file}"://HDFEOS/GRIDS/VNP_Grid_DNB/Data_Fields/DNB_At_Sensor_Radiance_500m'
        with rasterio.open(subdataset) as src:
            for idx, district in districts.iterrows():
                geom = [mapping(district.geometry)]
                try:
                    out_image, _ = mask(src, geom, crop=True)
                    data = out_image[0].flatten()
                    data = data[(data > 0) & (data < 65535)]
                    mean_rad = float(np.mean(data)) if len(data) > 0 else 0.0
                    results.append({
                        "district_code": idx,
                        "district_name": str(district.get("DISTRICT", "Unknown")),
                        "state": str(district.get("STATE", "Unknown")),
                        "year": year,
                        "month": month,
                        "mean_radiance": mean_rad
                    })
                except Exception:
                    pass
    except Exception as e:
        print(f"  Error: {e}")

print(f"Total records collected: {len(results)}")
if len(results) > 0:
    df = pd.DataFrame(results)
    df = df.groupby(["district_code","district_name","state","year","month"])["mean_radiance"].mean().reset_index()
    df = df.sort_values(["district_code","year","month"])
    df["delta_radiance"] = df.groupby("district_code")["mean_radiance"].diff()
    df.to_csv(output_csv, index=False)
    print(f"Done! Saved {len(df)} rows to {output_csv}")
else:
    print("No data collected - check errors above")
