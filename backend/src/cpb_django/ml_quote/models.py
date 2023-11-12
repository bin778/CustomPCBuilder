from django.db import models

# Create your models here.
class Comcase(models.Model):
    comcase_id = models.AutoField(primary_key=True)
    comcase_title = models.CharField(max_length=100)
    comcase_image = models.CharField(max_length=100)
    comcase_manufacturer = models.CharField(max_length=20)
    comcase_size = models.CharField(max_length=20)
    comcase_formfactors = models.CharField(max_length=20)
    comcase_price = models.IntegerField()
    comcase_color = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'comcase'


class Cooler(models.Model):
    cooler_id = models.AutoField(primary_key=True)
    cooler_title = models.CharField(max_length=100)
    cooler_image = models.CharField(max_length=100)
    cooler_manufacturer = models.CharField(max_length=20)
    cooler_cooling = models.CharField(max_length=20)
    cooler_wattage = models.IntegerField()
    cooler_price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'cooler'


class Cpu(models.Model):
    cpu_id = models.AutoField(primary_key=True)
    cpu_title = models.CharField(max_length=100)
    cpu_image = models.CharField(max_length=100)
    cpu_manufacturer = models.CharField(max_length=20)
    cpu_core = models.IntegerField()
    cpu_thread = models.IntegerField()
    cpu_clock = models.FloatField()
    cpu_socket = models.CharField(max_length=20)
    cpu_wattage = models.IntegerField()
    cpu_price = models.IntegerField()
    cpu_benchmark = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'cpu'


class Mainboard(models.Model):
    mainboard_id = models.AutoField(primary_key=True)
    mainboard_title = models.CharField(max_length=100)
    mainboard_image = models.CharField(max_length=100)
    mainboard_manufacturer = models.CharField(max_length=20)
    mainboard_cpu = models.CharField(max_length=20)
    mainboard_socket = models.CharField(max_length=20)
    mainboard_chipset = models.CharField(max_length=20)
    mainboard_formfactors = models.CharField(max_length=20)
    mainboard_wattage = models.IntegerField()
    mainboard_price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'mainboard'


class Memory(models.Model):
    memory_id = models.AutoField(primary_key=True)
    memory_title = models.CharField(max_length=100)
    memory_image = models.CharField(max_length=100)
    memory_manufacturer = models.CharField(max_length=20)
    memory_capacity = models.IntegerField()
    memory_clock = models.IntegerField()
    memory_wattage = models.IntegerField()
    memory_price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'memory'


class Power(models.Model):
    power_id = models.AutoField(primary_key=True)
    power_title = models.CharField(max_length=100)
    power_image = models.CharField(max_length=100)
    power_manufacturer = models.CharField(max_length=20)
    power_formfactors = models.CharField(max_length=20)
    power_output = models.IntegerField()
    power_price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'power'


class QuoteOrder(models.Model):
    quote_order_id = models.AutoField(primary_key=True)
    product_id = models.IntegerField()
    product_count = models.IntegerField()
    product_price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'quote_order'


class Storage(models.Model):
    storage_id = models.AutoField(primary_key=True)
    storage_title = models.CharField(max_length=100)
    storage_image = models.CharField(max_length=100)
    storage_manufacturer = models.CharField(max_length=20)
    storage_device = models.CharField(max_length=20)
    storage_capacity = models.CharField(max_length=20)
    storage_wattage = models.IntegerField()
    storage_price = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'storage'


class UserInfo(models.Model):
    user_num = models.AutoField(db_column='USER_NUM', primary_key=True)  # Field name made lowercase.
    user_id = models.CharField(db_column='USER_ID', max_length=30)  # Field name made lowercase.
    user_name = models.CharField(db_column='USER_NAME', max_length=30)  # Field name made lowercase.
    user_password = models.CharField(db_column='USER_PASSWORD', max_length=30)  # Field name made lowercase.
    user_birth = models.CharField(db_column='USER_BIRTH', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'user_info'


class Videocard(models.Model):
    videocard_id = models.AutoField(primary_key=True)
    videocard_title = models.CharField(max_length=100)
    videocard_image = models.CharField(max_length=100)
    videocard_manufacturer = models.CharField(max_length=20)
    videocard_chipset = models.CharField(max_length=20)
    videocard_capacity = models.IntegerField()
    videocard_clock = models.IntegerField()
    videocard_wattage = models.IntegerField()
    videocard_price = models.IntegerField()
    videocard_benchmark = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'videocard'