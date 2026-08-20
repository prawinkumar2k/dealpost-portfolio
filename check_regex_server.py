import paramiko

host = '187.127.217.225'
user = 'root'
password = 'Shalini@20052006'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, username=user, password=password)

# grep for catch all routes in server files and dist
stdin, stdout, stderr = client.exec_command('grep -rn "(.\*)" /var/www/dealpost/server /var/www/dealpost/dist 2>/dev/null')
output = stdout.read().decode('utf-8', errors='ignore')
print("GREP (.*):", output)

stdin, stdout, stderr = client.exec_command('grep -rn "\'\*\'" /var/www/dealpost/server /var/www/dealpost/dist 2>/dev/null')
output2 = stdout.read().decode('utf-8', errors='ignore')
print("GREP '*':", output2)

client.close()
