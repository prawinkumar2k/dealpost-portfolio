import paramiko

host = '187.127.217.225'
user = 'root'
password = 'Shalini@20052006'

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, username=user, password=password)

# Find the file
stdin, stdout, stderr = client.exec_command('find /root /var/www /home /opt -name "Index.tsx" -path "*/client/pages/Index.tsx" 2>/dev/null')
paths = stdout.read().decode('utf-8').strip().split('\n')
print("FOUND PATHS:", paths)

if paths and paths[0]:
    target_path = paths[0]
    print(f"Uploading to {target_path}...")
    
    # Upload via SFTP
    sftp = client.open_sftp()
    local_path = 'c:/Users/Hp/Downloads/dealpost-brand-narratives-d5e/client/pages/Index.tsx'
    sftp.put(local_path, target_path)
    
    project_root = target_path.split('/client/pages/Index.tsx')[0]
    server_path = project_root + '/server/routes/contact.ts'
    local_server = 'c:/Users/Hp/Downloads/dealpost-brand-narratives-d5e/server/routes/contact.ts'
    print(f"Uploading to {server_path}...")
    try:
        sftp.put(local_server, server_path)
    except Exception as e:
        print("Failed to upload server route:", e)
        
    sftp.close()
    
    print(f"Project root: {project_root}")
    
    # Build and restart
    cmd = f'cd {project_root} && pnpm build && pm2 restart all'
    print(f"Running: {cmd}")
    stdin, stdout, stderr = client.exec_command(cmd)
    
    stdout.read()
    stderr.read()

    
client.close()
