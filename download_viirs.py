import requests
import os

token = "eyJ0eXAiOiJKV1QiLCJvcmlnaW4iOiJFYXJ0aGRhdGEgTG9naW4iLCJzaWciOiJlZGxqd3RwdWJrZXlfb3BzIiwiYWxnIjoiUlMyNTYifQ.eyJ0eXBlIjoiVXNlciIsInVpZCI6ImtyaXNoMTMyMyIsImV4cCI6MTc4NDgyNDM0OCwiaWF0IjoxNzc5NjQwMzQ4LCJpc3MiOiJodHRwczovL3Vycy5lYXJ0aGRhdGEubmFzYS5nb3YiLCJpZGVudGl0eV9wcm92aWRlciI6ImVkbF9vcHMiLCJhY3IiOiJlZGwiLCJhc3N1cmFuY2VfbGV2ZWwiOjN9.uVrtY-w3PTA74eSKrQpjC5EWsf68WZ1NvQs6JlBYz_ZjHMlJSeD9ZoR6xMYrQ4sGGhOtcIWRN0juTnQRRSe3DgeOzn9kxVqQqQTLE9FqPsIqW5UlURuHO3pAqhw1KniSR7HS_E83_qC-r0bB6JLVmwgMe-kAgDiigt0zAvDeYyRlBFbeb5CdTpcpWJ4ZWdEFJAvFbM_8S965DzA1Ns4nZ7jRVOoJLnhXBuN01xQ1RjxCpobMXvDgwYwlxaQXWEockKqNlzenxqsqKZandfMFOq2n4V-uJrKol_m1czbW8W89d5TRvixQ6exl-TUY9kIrXjMwd5DW27vCDRHkGWlxPQ"
save_folder = r"C:\Users\krish\viirs_raw"
os.makedirs(save_folder, exist_ok=True)

headers = {"Authorization": f"Bearer {token}"}
tiles = ["h24v05", "h25v05", "h24v06", "h25v06"]

for year in range(2019, 2025):
    for month in range(1, 13):
        for tile in tiles:
            day_of_year = str((month - 1) * 30 + 1).zfill(3)
            filename = f"VNP46A3.A{year}{month:02d}01.{tile}.001.nc"
            url = f"https://ladsweb.modaps.eosdis.nasa.gov/archive/allData/5000/VNP46A3/{year}/{day_of_year}/{filename}"
            save_path = os.path.join(save_folder, filename)
            if os.path.exists(save_path) and os.path.getsize(save_path) > 100000:
                print(f"Already exists: {filename}")
                continue
            print(f"Downloading {filename}...")
            try:
                response = requests.get(url, headers=headers, stream=True, timeout=60)
                if response.status_code == 200:
                    with open(save_path, 'wb') as f:
                        for chunk in response.iter_content(chunk_size=8192):
                            f.write(chunk)
                    size = os.path.getsize(save_path)
                    print(f"Saved: {filename} ({size/1024:.0f} KB)")
                else:
                    print(f"Not found: {filename} (status {response.status_code})")
            except Exception as e:
                print(f"Error: {e}")

print("Download complete!")
