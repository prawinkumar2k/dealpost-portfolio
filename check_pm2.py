import paramiko
import sys

host = '187.127.217.225'
user = 'root'
password = 'Shalini@20052006'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, username=user, password=password)

# Check pm2 list
stdin, stdout, stderr = client.exec_command('pm2 list')
output = stdout.read().decode('utf-8')
print("PM2 LIST:", output.encode('ascii', 'ignore').decode('ascii'))
    
client.close()
