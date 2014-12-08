
dragbox [![Build Status](https://travis-ci.org/cortezcristian/dragbox.svg)](https://travis-ci.org/cortezcristian/dragbox) [![Dependencies](https://david-dm.org/cortezcristian/dragbox.png)](https://david-dm.org/cortezcristian/dragbox) [![Coverage Status](https://img.shields.io/coveralls/cortezcristian/dragbox.svg)](https://coveralls.io/r/cortezcristian/dragbox)
===========================

![FFB](http://moviesmedia.ign.com/movies/image/article/784/784153/kios-jamie1_1177708841.jpg)

Funky Fresh Boyz git repo for Koding's Global Virtual Hackathon. No one reads the fine print (ie TOS, EULA, legal documents) anymore yet every site has them. Devise a creative/interactive solution.

- [About the competition](https://koding.com/Hackathon)
- [About the team](https://github.com/koding/global.hackathon/blob/master/Teams/FunkyFreshBoyz/ABOUT.md)

## Our Solution

Reading terms and conditions can be tedious. But we look at the boring acitivity like an oportunity to:

- Engage visitors. Using gamification, we encourage the reading activity by giving points that later on you can change for gift services.
- Branding. We give the change to add a video next to the TOS so one of your formers employees reads and interpret for them. We belive lke the case of the 404 pages, that now are part of the branding.
- Once you have them as confirmed accounts, you can still keep giving rewards for actions such as helping other users to understand submitted questions on the subject (like stackoverflow does)

### Case study

We created a fake company called Dragbox, that sells cloud storage plans. Dragbox also have probles to engage, and increase loyalty, they also want to develop their global brand and change clients vision to be perceived as serious, profesional and 100% reliable.

### Use cases we develop:

First we go into a process of detection, and when user hits the check on accepting the terms, we do offer them to read them:

![DragBox](https://raw.githubusercontent.com/cortezcristian/dragbox/master/pics/drag-box-detection.png)


##### 1. Visit at least one Terms and Conditions page:

1.1 Go to [http://cortezcristian.koding.io/terms-and-conditions](http://cortezcristian.koding.io/terms-and-conditions)

1.2 A message will appear, you've won +10 points

![DragBox Earn](https://raw.githubusercontent.com/cortezcristian/dragbox/master/pics/drag-box-earn-60.png)

##### 2. Scroll down to the bottom of the Terms and Conditions page

2.1 Scroll to the bottom on [http://cortezcristian.koding.io/terms-and-conditions](http://cortezcristian.koding.io/terms-and-conditions) 

2.2 We detect this event and give tou another +50 points

##### 3. Putting a video with a former employee, that reads and explain carefully the Agreement while page scrolls automatically and can remark the main benefits of the service

3.1 We detect the video processing and give you +100 points

![DragBox Video](https://raw.githubusercontent.com/cortezcristian/dragbox/master/pics/drag-box-video.png)

With all the point's you have made you can then later on change the points for real prices
- 1GB free for 1 year, cost you 60 points

## How to see it working on koding.com

You can go to:
- [http://cortezcristian.koding.io/](http://cortezcristian.koding.io/)
- [http://uckk835a6038.cortezcristian.koding.io/](http://uckk835a6038.cortezcristian.koding.io/)

You, should be able to see this site:

![DragBox](https://raw.githubusercontent.com/cortezcristian/dragbox/master/pics/drag-box-home.png)

If you don't see it, it's because the server is down. Follow the instructions

### Instructions to start the server

I just left a file called `/home/cortezcristian/autostart.sh`

```bash
#!/bin/bash
sudo apache2ctl stop
sudo service apache2 stop
sudo service mongodb start
cd /home/cortezcristian/Applications/dragbox
git pull origin master
npm install
#git config --global url."https://".insteadOf git://
bower install
#sudo NODE_ENV=koding npm start
sudo forever stopall
sudo NODE_ENV=koding forever start /home/cortezcristian/Applications/dragbox/bin/www 

```

You can simply run:
```bash
$ sh /home/cortezcristian/autostart.sh
```

Note: Known issue, VM is running out of space recently, check `df -h`if disk is full MongoDB won't start and application wont load. I've uninstalled apache*, php* and a lot of extra stuff to prevent this.

After that you can manage the application with [forever](https://github.com/nodejitsu/forever). In example, you can run:
```bash
$ sudo forever list
info:    Forever processes running
data:        uid  command             script                                            forever pid   id logfile                                uptime      
data:    [0] QFZY /usr/local/bin/node /home/cortezcristian/Applications/dragbox/bin/www 11654   11656    /home/cortezcristian/.forever/QFZY.log 0:0:0:5.573
```

## Quick Setup

This site is done with [anyandgo](https://github.com/cortezcristian/anyandgo)

You'll need to have pre-installed:

- MongoDB (db version v2.4.x)
- NodeJS (v0.10.x)

How to get run this repo?

```bash
$ npm install -g grunt-cli bower yo mocha
$ git clone git@github.com:cortezcristian/dragbox.git
$ cd dragbox
$ npm install && bower install && grunt
```

