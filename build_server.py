import paramiko

host = '187.127.217.225'
user = 'root'
password = 'Shalini@20052006'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, username=user, password=password)

cmd = 'cd /var/www/dealpost && pnpm build'
stdin, stdout, stderr = client.exec_command(cmd)

output = stdout.read().decode('utf-8', errors='ignore')
err = stderr.read().decode('utf-8', errors='ignore')

with open('build_output.txt', 'w', encoding='utf-8') as f:
    f.write(output + "\nERRORS:\n" + err)
    
client.close()
