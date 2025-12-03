from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete all existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Team Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='Team DC Superheroes')

        # Create Users
        tony = User.objects.create(email='tony@stark.com', name='Tony Stark', team=marvel)
        steve = User.objects.create(email='steve@rogers.com', name='Steve Rogers', team=marvel)
        bruce = User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team=dc)
        clark = User.objects.create(email='clark@kent.com', name='Clark Kent', team=dc)

        # Create Workouts
        pushups = Workout.objects.create(name='Pushups', description='Do pushups', difficulty='Easy')
        running = Workout.objects.create(name='Running', description='Run 5km', difficulty='Medium')
        lifting = Workout.objects.create(name='Weight Lifting', description='Lift weights', difficulty='Hard')

        # Create Activities
        Activity.objects.create(user=tony, type='run', duration=30, date=timezone.now().date())
        Activity.objects.create(user=steve, type='pushups', duration=20, date=timezone.now().date())
        Activity.objects.create(user=bruce, type='lifting', duration=40, date=timezone.now().date())
        Activity.objects.create(user=clark, type='run', duration=25, date=timezone.now().date())

        # Create Leaderboard
        Leaderboard.objects.create(user=tony, score=150)
        Leaderboard.objects.create(user=steve, score=120)
        Leaderboard.objects.create(user=bruce, score=180)
        Leaderboard.objects.create(user=clark, score=170)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
