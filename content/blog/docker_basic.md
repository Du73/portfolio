---
title: "Docker cơ bản cho người mới"
date: "2025-01-10"
tags: ["docker", "devops"]
description: "Giải thích Docker từ A-Z cho người mới bắt đầu"
---

## Docker là gì?
Docker là công cụ giúp đóng gói ứng dụng vào container.

```bash
docker build -t myapp .
docker run -d -p 8080:80 myapp
---
title: "Understanding Docker Basics for Beginners"
date: "2025-10-25"
description: "A comprehensive guide to understanding containers, images, and how Docker creates consistent environments."
tags: ["Docker", "Containerization", "DevOps"]
---

Docker is an open platform for developing, shipping, and running applications. It enables you to separate your applications from your infrastructure so you can deliver software quickly.

## Why Docker?

* **Consistency:** "It works on my machine" is no longer an excuse.
* **Isolation:** Each container has its own resources.
* **Speed:** Containers are lightweight compared to VMs.

## Key Concepts

1.  **Dockerfile**: A text document that contains all the commands a user could call on the command line to assemble an image.
2.  **Image**: An immutable file that contains the source code, libraries, dependencies, tools, and other files needed for an application to run.
3.  **Container**: A runtime instance of an image.

```bash
# Example running nginx
docker run -d -p 80:80 nginx