import paramiko, time

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('187.127.217.225', username='root', password='Shalini@20052006')

# 1. Set SMTP env vars
print("=== Setting env vars ===")
_, out, _ = c.exec_command("grep -q 'SMTP_USER' /var/www/dealpost/.env || printf '\nSMTP_USER=hello@dealpost.co.in\nSMTP_PASS=rmrz eeld dgda zhch\nPORT=3000\n' >> /var/www/dealpost/.env")
time.sleep(1)
print(out.read().decode('utf-8','ignore'))

# 2. PM2 startup enable
print("\n=== PM2 startup ===")
_, out, _ = c.exec_command("systemctl enable pm2-root 2>&1 || echo 'pm2 already configured'")
time.sleep(2)
print(out.read().decode('utf-8','ignore'))

# 3. SSL via certbot
print("\n=== Running certbot SSL ===")
_, out, err = c.exec_command("certbot --nginx -d dealpost.co.in -d www.dealpost.co.in --non-interactive --agree-tos -m hello@dealpost.co.in 2>&1")
print("Waiting for certbot...")
time.sleep(20)
result = out.read().decode('utf-8','ignore')
print(result[:3000])

c.close()
print("\n=== Done ===")
