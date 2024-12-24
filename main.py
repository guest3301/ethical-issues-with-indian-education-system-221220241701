import requests
import pandas as pd

# Fetch teacher-student ratio data
url_ptr = 'https://www.indiastat.com/data/education/pupil-teacher-ratio-ptr-in-primary-and-upper-primary-schools'
response_ptr = requests.get(url_ptr)
if response_ptr.status_code == 200:
    # Process the data (assuming it's in CSV format)
    data_ptr = pd.read_csv(response_ptr.text)
    print(data_ptr.head())
else:
    print(f"Failed to fetch PTR data. Status code: {response_ptr.status_code}")

# Fetch teacher absenteeism data
url_absenteeism = 'https://etico.iiep.unesco.org/en/teacher-absence-india-snapshot'
response_absenteeism = requests.get(url_absenteeism)
if response_absenteeism.status_code == 200:
    # Process the data (assuming it's in CSV format)
    data_absenteeism = pd.read_csv(response_absenteeism.text)
    print(data_absenteeism.head())
else:
    print(f"Failed to fetch absenteeism data. Status code: {response_absenteeism.status_code}")

# Fetch teacher training expenditure data
url_training_expenditure = 'https://opportunities-insight.britishcouncil.org/features/indias-national-education-budget-2023-24'
response_training_expenditure = requests.get(url_training_expenditure)
if response_training_expenditure.status_code == 200:
    # Process the data (assuming it's in CSV format)
    data_training_expenditure = pd.read_csv(response_training_expenditure.text)
    print(data_training_expenditure.head())
else:
    print(f"Failed to fetch training expenditure data. Status code: {response_training_expenditure.status_code}")

# Calculate average teacher-student ratio
average_ptr = data_ptr['PTR'].mean()
print(f"Average Teacher-Student Ratio: {average_ptr}")
