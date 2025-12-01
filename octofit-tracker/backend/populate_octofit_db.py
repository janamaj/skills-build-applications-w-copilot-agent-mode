import pymongo
from datetime import date

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['octofit_db']

# Drop collections if they exist
for col in ['users', 'teams', 'activities', 'workouts', 'leaderboard']:
    db[col].drop()

# Teams
marvel_id = db.teams.insert_one({'name': 'Marvel', 'description': 'Team Marvel Superheroes'}).inserted_id
dc_id = db.teams.insert_one({'name': 'DC', 'description': 'Team DC Superheroes'}).inserted_id

# Users
tony_id = db.users.insert_one({'email': 'tony@stark.com', 'name': 'Tony Stark', 'team': marvel_id}).inserted_id
steve_id = db.users.insert_one({'email': 'steve@rogers.com', 'name': 'Steve Rogers', 'team': marvel_id}).inserted_id
bruce_id = db.users.insert_one({'email': 'bruce@wayne.com', 'name': 'Bruce Wayne', 'team': dc_id}).inserted_id
clark_id = db.users.insert_one({'email': 'clark@kent.com', 'name': 'Clark Kent', 'team': dc_id}).inserted_id

# Workouts
pushups_id = db.workouts.insert_one({'name': 'Pushups', 'description': 'Do pushups', 'difficulty': 'Easy'}).inserted_id
running_id = db.workouts.insert_one({'name': 'Running', 'description': 'Run 5km', 'difficulty': 'Medium'}).inserted_id
lifting_id = db.workouts.insert_one({'name': 'Weight Lifting', 'description': 'Lift weights', 'difficulty': 'Hard'}).inserted_id

# Activities
now = date.today().isoformat()
db.activities.insert_many([
    {'user': tony_id, 'type': 'run', 'duration': 30, 'date': now},
    {'user': steve_id, 'type': 'pushups', 'duration': 20, 'date': now},
    {'user': bruce_id, 'type': 'lifting', 'duration': 40, 'date': now},
    {'user': clark_id, 'type': 'run', 'duration': 25, 'date': now},
])

# Leaderboard
leaderboard = [
    {'user': tony_id, 'score': 150},
    {'user': steve_id, 'score': 120},
    {'user': bruce_id, 'score': 180},
    {'user': clark_id, 'score': 170},
]
db.leaderboard.insert_many(leaderboard)

# Ensure unique index on email
try:
    db.users.create_index([('email', 1)], unique=True)
    print('Unique index on email created.')
except Exception as e:
    print('Index creation error:', e)

print('octofit_db database populated with test data.')
