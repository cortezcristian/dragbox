
dragbox [![Build Status](https://travis-ci.org/cortezcristian/dragbox.svg)](https://travis-ci.org/cortezcristian/dragbox) [![Dependencies](https://david-dm.org/cortezcristian/dragbox.png)](https://david-dm.org/cortezcristian/dragbox) [![Coverage Status](https://img.shields.io/coveralls/cortezcristian/dragbox.svg)](https://coveralls.io/r/cortezcristian/dragbox)
===========================

![FFB](http://moviesmedia.ign.com/movies/image/article/784/784153/kios-jamie1_1177708841.jpg)

Funky Fresh Boyz git repo for Koding's Global Virtual Hackathon. No one reads the fine print (ie TOS, EULA, legal documents) anymore yet every site has them. Devise a creative/interactive solution.

- [About the competition](https://koding.com/Hackathon)
- [About the team](https://github.com/koding/global.hackathon/blob/master/Teams/FunkyFreshBoyz/ABOUT.md)

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
export NODE_ENV=koding
sudo export NODE_ENV=koding
sudo apache2ctl stop
sudo service apache2 stop
sudo service mongodb start
cd /home/cortezcristian/Applications/dragbox
git pull origin master
npm install
bower install
sudo npm start
```

You can simply run:
```bash
$ sh /home/cortezcristian/autostart.sh
```

Note: Known issue, VM is running out of space recently, check `df -h`if disk is full MongoDB won't start and application wont load. I've uninstalled apache*, php* and a lot of extra stuff to prevent this.

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

