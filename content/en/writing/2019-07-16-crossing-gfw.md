---
title: Crossing GFW in WHU
date: 2019-07-16
category: writings
tags:
  - Daily
---

## Background

Mastering stable methods of crossing the Great Firewall (GFW) is important for students majoring in mathematics. Up to now, popular solutions includes VPN, Shadowsocks, Ipv6 hosts Go-Agent and the hero of today---Ipv6 DNS. Here are some introductions to them.

## VPN

Most VPN applications appearing in Google Play Store has deviated from its original definition as providing VPN services; they are not based on protocols such as L2TP , rather the solution [Shadowsocks](#shadowsocks). So these applications permit connections with higher speed than earlier ones.

Wuma VPN is recommended since its design can be easily hacked once you have gained the root access. Unfortunately it cannot run on Android 10 as so far. You can find the full list of all Shadowsocks severs (including password) in its [preference](https://stackoverflow.com/questions/6146106/where-are-shared-preferences-stored) xml-file in the data folder. I suspected website [https://free-ss.site/] uses this trick.

If access to Google Play Store is not possible, you can use [https://www.apkmirror.com/].

## Shadowsocks & V2ray

Shadowsocks solution is the best choice when ipv6 network is not available. See offcial introduction to [V2ray](https://toutyrater.github.io/).

## Ipv6 host

Write to your OS default hosts file works in all platforms. Changing ipv4 hosts is impossible nowadays, but some applications seem to work through this way perfectly. In fact they pair the blocked websites by one fixed ipv4 address that is able to crossing the GFW via other methods. If you are in ipv6 network, such as the Campus-Network, then using a [ipv6 hosts](https://github.com/lennylxx/ipv6-hosts) project on GitHub works fine. Additionally, mobile cellular network support ipv6 as well by modifing the ARN settings.

## Go-Agent

Using XX-Net for desktops and Xndroid for Android phone if you have root access. This solution relies on ipv6 network; it works for all platforms except Chrome OS.

Updating the hosts file is needed sometimes.

## Ipv6-DNS

Change your ipv6 DNS to `2001:470:20::2` and watch YouTube from DuckDuckGo if you need. This solution works natively for IOS , Chromebook and Windows. As for Android, you may need a suitable DNS changing application.

## Google Products

As so far, Google Drive and Gmail is available under ipv6 network without auxiliary efforts if using Google Pixel phone or Chromebook. We can access Google Play Store on Pixel when connected to WHU-STU without obstruction. Note that WHU-WLAN supports ipv6 connection not as well as WHU-STU.
