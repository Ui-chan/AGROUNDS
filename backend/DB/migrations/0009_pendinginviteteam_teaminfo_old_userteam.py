# Generated by Django 4.0.3 on 2024-12-15 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DB', '0008_teammatchinfo_userinfo_usermatch_usermatchasteam_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PendingInviteTeam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_code', models.CharField(max_length=45)),
                ('team_code', models.CharField(max_length=45)),
                ('direction', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'pending_invite_team',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TeamInfo_old',
            fields=[
                ('team_code', models.CharField(max_length=45, primary_key=True, serialize=False)),
                ('team_host', models.CharField(blank=True, max_length=45, null=True)),
                ('team_name', models.CharField(blank=True, max_length=45, null=True)),
                ('team_player', models.JSONField(blank=True)),
                ('team_logo', models.CharField(blank=True, max_length=45, null=True)),
                ('team_point', models.IntegerField(blank=True, null=True)),
                ('team_area', models.CharField(blank=True, max_length=45, null=True)),
                ('team_description', models.CharField(blank=True, max_length=45, null=True)),
                ('team_games', models.JSONField(blank=True)),
            ],
            options={
                'db_table': 'team_info',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserTeam',
            fields=[
                ('user_code', models.CharField(max_length=45, primary_key=True, serialize=False)),
                ('team_code', models.CharField(max_length=45)),
            ],
            options={
                'db_table': 'user_team',
                'managed': False,
            },
        ),
    ]
