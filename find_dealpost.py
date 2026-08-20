import paramiko
import sys

host = '187.127.217.225'
user = 'root'
password = 'Shalini@20052006'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    client.connect(hostname=host, username=user, password=password)
    # Check common locations
    stdin, stdout, stderr = client.exec_command('ls -la /root && echo "----" && ls -la /var/www || true')
    output = stdout.read().decode('utf-8')
    print("DIRS:", output)
    
    # Check running processes
    stdin, stdout, stderr = client.exec_command('pm2 jlist || ps aux | grep node')
    print("PROCS:", stdout.read().decode('utf-8'))
    
finally:
    client.close()
