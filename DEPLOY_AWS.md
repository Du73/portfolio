# Hướng Dẫn Deploy Website lên AWS EC2 với Tên Miền

Hướng dẫn chi tiết để deploy website Next.js portfolio lên AWS EC2 và kết nối với tên miền của bạn.

## 📋 Mục Lục

1. [Chuẩn Bị](#chuẩn-bị)
2. [Tạo EC2 Instance](#tạo-ec2-instance)
3. [Cấu Hình EC2 Instance](#cấu-hình-ec2-instance)
4. [Deploy Application](#deploy-application)
5. [Cấu Hình Tên Miền](#cấu-hình-tên-miền)
6. [Cài Đặt SSL (HTTPS)](#cài-đặt-ssl-https)
7. [Tự Động Hóa Deployment](#tự-động-hóa-deployment)

---

## 🎯 Chuẩn Bị

Trước khi bắt đầu, bạn cần:

- ✅ Tài khoản AWS với quyền truy cập EC2
- ✅ Tên miền đã mua (domain name)
- ✅ SSH key pair để kết nối với EC2
- ✅ Kiến thức cơ bản về Linux commands

---

## 🚀 Bước 1: Tạo EC2 Instance

### 1.1. Đăng nhập vào AWS Console

1. Truy cập [AWS Console](https://console.aws.amazon.com/)
2. Đăng nhập vào tài khoản của bạn
3. Chọn region phù hợp (ví dụ: `ap-southeast-1` cho Singapore)

### 1.2. Launch EC2 Instance

1. Vào **EC2 Dashboard** → Click **"Launch Instance"**
2. Đặt tên instance (ví dụ: `my-portfolio`)
3. Chọn **Amazon Linux 2023** (AMI)
4. Chọn instance type:
   - **t2.micro** (Free tier, đủ cho website nhỏ)
   - **t3.small** (tốt hơn, ~$15/tháng)
5. Tạo hoặc chọn **Key Pair** (lưu file `.pem` cẩn thận!)
6. Cấu hình **Security Group**:
   - **SSH (22)**: Chỉ IP của bạn hoặc `0.0.0.0/0` (tạm thời)
   - **HTTP (80)**: `0.0.0.0/0`
   - **HTTPS (443)**: `0.0.0.0/0`
7. Cấu hình storage: 20GB (gp3) là đủ
8. Click **"Launch Instance"**

### 1.3. Lấy Public IP

Sau khi instance chạy, ghi lại **Public IPv4 address** (ví dụ: `3.104.123.45`)

---

## ⚙️ Bước 2: Cấu Hình EC2 Instance

### 2.1. Kết Nối Vào EC2

**Trên Windows (PowerShell hoặc Git Bash):**

```bash
# Di chuyển đến thư mục chứa key file
cd path/to/your/key

# Set quyền cho key file (nếu dùng Git Bash)
chmod 400 your-key.pem

# Kết nối SSH
ssh -i your-key.pem ec2-user@YOUR_PUBLIC_IP
```

**Lưu ý:** Thay `YOUR_PUBLIC_IP` bằng IP thực tế của EC2 instance.

### 2.2. Cập Nhật Hệ Thống

```bash
sudo dnf update -y
```

### 2.3. Cài Đặt Docker

```bash
# Cài đặt Docker
sudo dnf install -y docker

# Khởi động Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Thêm user hiện tại vào docker group (để chạy docker không cần sudo)
sudo usermod -aG docker ec2-user

# Đăng xuất và đăng nhập lại để áp dụng thay đổi
exit
```

Kết nối lại vào EC2:

```bash
ssh -i your-key.pem ec2-user@YOUR_PUBLIC_IP
```

Kiểm tra Docker:

```bash
docker --version
docker ps
```

### 2.4. Cài Đặt Docker Compose

```bash
# Tải Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Set quyền thực thi
sudo chmod +x /usr/local/bin/docker-compose

# Kiểm tra
docker-compose --version
```

### 2.5. Cài Đặt Git (nếu cần)

```bash
sudo dnf install -y git
```

---

## 📦 Bước 3: Deploy Application

### 3.1. Clone Repository

Có 2 cách:

**Cách 1: Clone từ Git (khuyến nghị)**

```bash
# Tạo thư mục cho project
mkdir -p ~/projects
cd ~/projects

# Clone repository (thay bằng URL repo của bạn)
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

**Cách 2: Upload code lên EC2**

Sử dụng SCP từ máy local:

```bash
# Từ máy local, chạy lệnh này (trong PowerShell/Git Bash)
scp -i your-key.pem -r . ec2-user@YOUR_PUBLIC_IP:~/projects/my-portfolio
```

Sau đó kết nối vào EC2:

```bash
ssh -i your-key.pem ec2-user@YOUR_PUBLIC_IP
cd ~/projects/my-portfolio
```

### 3.2. Cấu Hình Environment Variables

Tạo file `.env` nếu cần (hiện tại project không cần, nhưng có thể cần sau):

```bash
# Tạo file .env (nếu cần)
nano .env
```

### 3.3. Build và Chạy với Docker Compose

```bash
# Build và start containers
docker-compose up -d --build

# Kiểm tra logs
docker-compose logs -f

# Kiểm tra containers đang chạy
docker-compose ps
```

### 3.4. Kiểm Tra Website

Mở trình duyệt và truy cập: `http://YOUR_PUBLIC_IP`

Bạn sẽ thấy website của mình!

---

## 🌐 Bước 4: Cấu Hình Tên Miền

### 4.1. Cấu Hình DNS

Truy cập vào nhà cung cấp tên miền của bạn (GoDaddy, Namecheap, Cloudflare, v.v.) và thêm **A Record**:

- **Type**: `A`
- **Name**: `@` (hoặc để trống cho root domain) hoặc `www` cho subdomain
- **Value**: `YOUR_PUBLIC_IP` (IP của EC2 instance)
- **TTL**: `3600` (hoặc mặc định)

**Ví dụ:**
- `yourdomain.com` → `3.104.123.45`
- `www.yourdomain.com` → `3.104.123.45`

### 4.2. Cập Nhật Nginx Configuration

Cập nhật file `nginx/nginx.conf` để sử dụng domain của bạn (xem hướng dẫn trong file này).

### 4.3. Restart Containers

```bash
cd ~/projects/my-portfolio
docker-compose restart
```

Chờ 5-10 phút để DNS propagate, sau đó truy cập: `http://yourdomain.com`

---

## 🔒 Bước 5: Cài Đặt SSL (HTTPS)

### 5.1. Cài Đặt Certbot

```bash
# Cài đặt Certbot
sudo dnf install -y certbot python3-certbot-nginx

# Hoặc nếu không có nginx package, dùng standalone mode
sudo dnf install -y certbot
```

### 5.2. Tạm Thời Dừng Nginx Container

```bash
cd ~/projects/my-portfolio
docker-compose stop nginx
```

### 5.3. Tạo SSL Certificate

```bash
# Tạo certificate (thay yourdomain.com bằng domain của bạn)
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Nhập email của bạn và chấp nhận terms
# Chọn Y cho việc redirect HTTP to HTTPS (khuyến nghị)
```

Certificates sẽ được lưu tại:
- `/etc/letsencrypt/live/yourdomain.com/fullchain.pem`
- `/etc/letsencrypt/live/yourdomain.com/privkey.pem`

### 5.4. Cấu Hình Nginx với SSL

Cập nhật file `nginx/nginx.conf` để sử dụng SSL (đã được cấu hình sẵn trong file nginx.conf mới).

### 5.5. Update Docker Compose để Mount SSL Certificates

Cập nhật `compose.yaml` để mount SSL certificates (xem file compose.yaml đã cập nhật).

### 5.6. Restart Containers

```bash
cd ~/projects/my-portfolio
docker-compose up -d
```

### 5.7. Tự Động Gia Hạn SSL

Tạo cron job để tự động gia hạn certificate:

```bash
# Mở crontab
sudo crontab -e

# Thêm dòng sau (chạy 2 lần mỗi ngày để kiểm tra)
0 0,12 * * * certbot renew --quiet --deploy-hook "cd /home/ec2-user/projects/my-portfolio && docker-compose restart nginx"
```

---

## 🔄 Bước 6: Tự Động Hóa Deployment

### 6.1. Tạo Deployment Script

Tạo file `deploy.sh` trong project (đã được tạo sẵn).

### 6.2. Sử Dụng Script

```bash
# Cấp quyền thực thi
chmod +x deploy.sh

# Chạy deployment
./deploy.sh
```

---

## 🔧 Bảo Trì và Troubleshooting

### Xem Logs

```bash
# Xem logs của tất cả containers
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f nextjs_app
docker-compose logs -f nginx
```

### Restart Services

```bash
# Restart tất cả
docker-compose restart

# Restart service cụ thể
docker-compose restart nextjs_app
docker-compose restart nginx
```

### Update Code

```bash
# Pull code mới
git pull

# Rebuild và restart
docker-compose up -d --build
```

### Kiểm Tra Disk Space

```bash
df -h
docker system df
```

### Cleanup Docker (nếu cần)

```bash
# Xóa unused images, containers, volumes
docker system prune -a --volumes
```

---

## 📊 Monitoring (Tùy Chọn)

### Cài Đặt htop

```bash
sudo dnf install -y htop
htop
```

### Set Up CloudWatch (AWS)

- Có thể cấu hình CloudWatch để monitor EC2 instance
- Xem metrics trong EC2 Dashboard

---

## 🔐 Security Best Practices

1. **Chỉ mở ports cần thiết** trong Security Group
2. **Giới hạn SSH access** chỉ từ IP của bạn
3. **Sử dụng strong passwords** (nếu có)
4. **Cập nhật system thường xuyên**: `sudo dnf update -y`
5. **Backup định kỳ**: Backup code và database (nếu có)
6. **Sử dụng CloudFront** (optional) để cache và bảo vệ DDoS

---

## 💰 Chi Phí Ước Tính

- **EC2 t2.micro**: Free tier (750 giờ/tháng) hoặc ~$8-10/tháng
- **Elastic IP**: Free nếu đang sử dụng với instance
- **Data Transfer**: 100GB free/tháng, sau đó ~$0.09/GB
- **Domain**: ~$10-15/năm (tùy nhà cung cấp)
- **SSL Certificate**: Free với Let's Encrypt

**Tổng ước tính**: ~$0-15/tháng (nếu dùng free tier)

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra logs: `docker-compose logs -f`
2. Kiểm tra Security Group settings
3. Kiểm tra DNS propagation: `nslookup yourdomain.com`
4. Kiểm tra firewall: `sudo iptables -L`

---

## ✅ Checklist Deployment

- [ ] EC2 instance đã tạo và chạy
- [ ] Security Group đã cấu hình đúng ports
- [ ] Đã cài đặt Docker và Docker Compose
- [ ] Đã clone/upload code lên EC2
- [ ] Đã build và chạy containers
- [ ] Website truy cập được qua IP
- [ ] Đã cấu hình DNS records
- [ ] Website truy cập được qua domain
- [ ] Đã cài đặt SSL certificate
- [ ] Website chạy HTTPS thành công
- [ ] Đã cấu hình auto-renewal cho SSL

---

**Chúc bạn deploy thành công! 🎉**

