# Zenith Cloudkit

English | [简体中文](README_zh.md)

Welcome to Zenith Cloudkit! This is a fantastic toolkit designed to make your cloud development more easier. Whether you're a seasoned professional or just getting started, this README will guide you through everything you need to know to get up and running with Zenith Cloudkit.

## Table of Contents

- [Getting Started](#getting-started)
  - [Architecture](#architecture)
  - [Installation](#installation)
  - [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you install and use Zenith Cloudkit on your local machine.

### Architecture

![architecture](/source/app/public/imgs/architecture.png)

### Installation

To install Zenith Cloudkit, simply follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/530051970/auth-hub-demo.git

2. Navigate to the directory containing Zenith Cloudkit:

   ```bash
   cd auth-hub-demo/source/app

3. Install the necessary dependencies:

   ```bash
   npm install

### Usage

1. Once installed, you can use Zenith Cloudkit by running the following command:

   ```bash
   npm run start

This will start the application and you can access it at http://localhost:3000 in your web browser.

![login](/source/app/public/imgs/login.png)

### Features
- Feature 1: Tools.
  ### S3 Crusher
  When deleting an S3 bucket via the console, it must be manually emptied first, as shown in the picture below.

![emptyS3](/source/app/public/imgs/emptyS3.png)

  In a real-world scenarios, there are often dozens of S3 buckets that need to be cleaned up, and manually deleting them one by one is very inefficient. S3 Crusher can be used to delete multiple S3 buckets in one click, regardless of whether the buckets are empty, as shown in the picture below.

![s3crusher-1](/source/app/public/imgs/s3crusher-1.png)
![s3crusher-2](/source/app/public/imgs/s3crusher-2.png)

  ### NAT Traversal
  In cloud application development, it is common to encounter scenarios where you need to connect to VPC private subnet resources from a local environment. Typically, this requires setting up a bastion host within the VPC and configuring security groups, which is a cumbersome process. With this tool, you can easily set up a bastion host in two steps, enabling access to cloud resources from the local environment.

![nat-1](/source/app/public/imgs/nat-1.png)
![nat-2](/source/app/public/imgs/nat-2.png)

- Feature 2: Templates.
  This module will gradually release a series of small applications. Users can download the corresponding templates, deploy them to their accounts, and start using them immediately. If needed, you can submit an issue to contact the author for new templates development. You are also welcome to click here to submit a PR for secondary development.

![template](/source/app/public/imgs/template.png) 

  ### Data-Generator 
  During the development of B2B products, B2C products, or model training, the requirements for datasets are becoming increasingly stringent. Generally, these can be summarized as follows:
![dataset](/source/app/public/imgs/dataset.png) 
  This product allows you to complete the entire process from data generation to data injection in just a few simple steps. The specifics are as follows:
  1）Customize fields

![customize](/source/app/public/imgs/customize-fields.png) 

  2）Config tool params

![params](/source/app/public/imgs/tool-params.png) 

  3）Set output endpoint

![endpoint](/source/app/public/imgs/endpoint.png) 

  4）Preview & Start

![preview](/source/app/public/imgs/preview.png)   

- Feature 3: Scaffold.
  Continuous updates are on the way, so stay tuned.

### Contributing
We welcome contributions from the community! If you have ideas for new features or improvements, please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch: 

   ```bash
   git checkout -b my-new-feature

3. Commit your changes:

   ```bash
   git commit -am 'Add some feature'

4. Push to the branch:

   ```bash
   git push origin my-new-feature

5. Submit a pull request.

### License
This project is licensed under the Apache License Version 2.0 - see the [LICENSE](http://www.apache.org/licenses/) file for details.