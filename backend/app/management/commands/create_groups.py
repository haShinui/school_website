from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission

class Command(BaseCommand):
    help = 'Create user groups and assign permissions'

    def handle(self, *args, **kwargs):
        # Create groups
        basic_user_group, created = Group.objects.get_or_create(name='BasicUser')
        completed_user_group, created = Group.objects.get_or_create(name='CompletedUser')
        manager_group, created = Group.objects.get_or_create(name='Manager')

        # Assign permissions
        permission = Permission.objects.get(codename='can_view_calendar')
        completed_user_group.permissions.add(permission)

        permission = Permission.objects.get(codename='can_manage_users')
        manager_group.permissions.add(permission)

        self.stdout.write(self.style.SUCCESS('Successfully created groups and assigned permissions'))
