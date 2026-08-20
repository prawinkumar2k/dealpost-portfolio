import paramiko
import sys

host = '187.127.217.225'
user = 'root'
password = 'Shalini@20052006'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, username=user, password=password)

# Check pm2 logs
stdin, stdout, stderr = client.exec_command('pm2 logs --lines 20 --nostream')
output = stdout.read().decode('utf-8', errors='ignore')
with open('logs.txt', 'w', encoding='utf-8') as f:
    f.write(output)
    
client.close()
