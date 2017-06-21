# meshblu-connector-configurator-windows-registry
Configure meshblu connectors from the windows registry

## Usage
Create a structure under the key `\HKCU\Software\Octoblu\MeshbluConnectors` with a key of the meshblu device type. In each type key, add another key that contains the string values `uuid` and `token`
```
\HKCU\Software\Octoblu\MeshbluConnectors
├── meshblu-connector-skype
│   ├── some-key-name
│   │   ├── uuid: "skype-device-uuid"
│   │   ├── token: "skype-device-token"
├── meshblu-connector-powermate
│   ├── some-other-key-name
│   │   ├── uuid: "powermate-device-uuid"
│   │   ├── token: "powermate-device-token"
│   ├── this-key-name-isnt-used-for-anything
│   │   ├── uuid: "another-powermate-device-uuid"
│   │   ├── token: "another-powermate-device-token"
```
