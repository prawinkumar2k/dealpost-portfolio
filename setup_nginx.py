import paramiko

host = '187.127.217.225'
user = 'root'
password = 'Shalini@20052006'

nginx_config = """
server {
    listen 80;
    server_name dealpost.co.in www.dealpost.co.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
"""

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, username=user, password=password)

print("Writing Nginx config...")
stdin, stdout, stderr = client.exec_command("cat > /etc/nginx/sites-available/dealpost.co.in << 'EOF'\n" + nginx_config + "\nEOF")
stdout.read()
stderr.read()

print("Enabling site...")
client.exec_command("ln -s /etc/nginx/sites-available/dealpost.co.in /etc/nginx/sites-enabled/")

print("Testing Nginx config...")
stdin, stdout, stderr = client.exec_command("nginx -t")
print(stdout.read().decode())
print(stderr.read().decode())

print("Restarting Nginx...")
client.exec_command("systemctl restart nginx")

client.close()
print("Done!")
