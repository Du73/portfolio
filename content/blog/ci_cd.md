```md
---
title: "CI/CD với GitHub Actions"
date: "2025-01-12"
description: "Tạo pipeline build & deploy tự động"
tags: ["ci-cd", "github"]
---

## CI/CD là gì?
CI/CD giúp tự động hóa build, test, deploy.

```yaml
name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3