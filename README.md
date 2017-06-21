# meshblu-connector-configurator-windows-registry
Configure Meshblu Connectors using PM2 using a directory tree of meshblu.json


## Build on ARM
```
../dockcross-node/dockcross-linux-armv7 --image octoblu/dockcross-node-linux-armv7 bash -c 'export HOME=/tmp/cache && yarn install && yarn package -- --target node8-linux-armv7'; and cp deploy/command deploy/meshblu-connector-configurator-windows-registry_1.0-1/usr/share/meshblu-connector-pm2/configurators/meshblu-connector-configurator-windows-registry
rm -rf meshblu-connector-configurator-windows-registry_1.0-1/DEBIAN meshblu-connector-configurator-windows-registry_1.0-1/etc; cp -rfp ../.installer/debian/* meshblu-connector-configurator-windows-registry_1.0-1 ; and dpkg --build meshblu-connector-configurator-windows-registry_1.0-1; and scp meshblu-connector-configurator-windows-registry_1.0-1.deb pi@192.168.100.141:; ssh pi@192.168.100.141 "sudo dpkg -i meshblu-connector-configurator-windows-registry_1.0-1.deb"
cd deploy/
```
