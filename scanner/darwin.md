Discover Devices…

```
$ dns-sd -B _raop._tcp

Browsing for _raop._tcp
DATE: ---Tue 29 Dec 2015---
 1:03:41.525  ...STARTING...
Timestamp     A/R    Flags  if Domain               Service Type         Instance Name
 1:03:41.526  Add        3   5 local.               _raop._tcp.          XXXXXXXXXXXX@Apple TV
 1:03:41.526  Add        3   5 local.               _raop._tcp.          XXXXXXXXXXXX@Dining Room AirPort Express
 1:03:41.526  Add        3   5 local.               _raop._tcp.          XXXXXXXXXXXX@Living Room AirPort Express
 1:03:41.526  Add        2   5 local.               _raop._tcp.          XXXXXXXXXXXX@Bedroom AirPort Express
^C
```

Discover device domain name and port

```
$ dns-sd -L 'XXXXXXXXXXXX@Dining Room AirPort Express' _raop._tcp local.

Lookup XXXXXXXXXXXX@Dining Room AirPort Express._raop._tcp.local
DATE: ---Tue 29 Dec 2015---
 0:57:02.398  ...STARTING...
 0:57:02.716  XXXXXXXXXXXX@Dining\032Room\032AirPort\032Express._raop._tcp.local. can be reached at Dining-Room-AirPort-Express.local.:5000 (interface 5)
 txtvers=1 ch=2 cn=0,1 et=0,4 sv=false da=true sr=44100 ss=16 pw=false vn=65537 tp=TCP,UDP vs=105.1 am=AirPort10,115 fv=76500.6 sf=0x0
^C
```

Discover device ip address

```
$ dns-sd -G v4 'Dining-Room-AirPort-Express.local.'

DATE: ---Tue 29 Dec 2015---
 1:00:37.732  ...STARTING...
Timestamp     A/R Flags if Hostname                               Address                                      TTL
 1:00:37.733  Add     3  5 Dining-Room-AirPort-Express.local.     10.0.1.18                                    120
 1:00:37.733  Add     2  5 Dining-Room-AirPort-Express.local.     169.254.169.127                              120
^C
```