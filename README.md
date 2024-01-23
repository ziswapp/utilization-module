# Modul Penggunaan Dana

Modul ini di gunakan untuk mencatat penggunaan dana yang dilakukan oleh user.

## Penggunaan

### Instalasi

Enable terlebih dahulu module nya

```bash
php artisan module:enable utilization
```
Running migration

```bash
php artisan module:migrate utilization --force
```
Running seeder table

```bash
php artisan db:seed --class="Modules\Utilization\Database\Seeders\UtilizationSeeder" --force
```
Di titik ini module sudah aktif

### Permission baru

Buat permission baru dengan nama

1. `menu.utilization.dashboard`
2. `menu.utilization`
3. `menu.utilization.create`
4. `menu.utilization.export`
5. `menu.utilization.beneficiary`
6. `action.utilization.cancel`
7. `action.utilization.create`
8. `action.utilization.show`
9. `action.utilization.edit`

### Sumber Dana dan Jenis Penggunaan

Sebelum menggunaan terlebih dahulu buat Sumber Dana dan Jenis Penggunaan
pada halaman admin

