import paramiko

host = '187.127.217.225'
user = 'root'
password = 'Shalini@20052006'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, username=user, password=password)

sftp = client.open_sftp()
sftp.put('c:/Users/Hp/Downloads/dealpost-brand-narratives-d5e/server/node-build.ts', '/var/www/dealpost/server/node-build.ts')
sftp.put('c:/Users/Hp/Downloads/dealpost-brand-narratives-d5e/server/index.ts', '/var/www/dealpost/server/index.ts')
sftp.close()

# Build and restart
cmd = 'cd /var/www/dealpost && pnpm build && pm2 restart all'
stdin, stdout, stderr = client.exec_command(cmd)

stdout.read()
stderr.read()
    
client.close()
