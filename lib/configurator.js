const path = require("path")
const Promise = require("bluebird")
const fs = require("fs-extra")
const { MeshbluConnectorDaemon } = require("meshblu-connector-daemon")
const Registry = require("winreg")
const flatten = require("lodash.flatten")

class MeshbluConnectorConfigurator {
  constructor({ connectorHome }) {
    this.connectorHome = connectorHome
    this.connectorsPath = path.resolve(path.join(connectorHome, "connectors"))
    this.configurationsPath = path.resolve(path.join(connectorHome, "config", "windows-registry"))
  }

  getTypeKeys(regKey) {
    return new Promise((resolve, reject) => {
      regKey.keys((error, typeKeys) => {
        if (error) return reject(error)
        return resolve(typeKeys)
      })
    })
  }

  getConnectorKeys(typeKey) {
    return new Promise((resolve, reject) => {
      typeKey.keys((error, connectorKeys) => {
        if (error) return reject(error)
        const keys = connectorKeys.map(connectorKey => {
          return { typeKey, connectorKey }
        })
        return resolve(keys)
      })
    })
  }

  getConnectorConfig({ typeKey, connectorKey }) {
    return new Promise((resolve, reject) => {
      connectorKey.values((error, items) => {
        if (error) return reject(error)
        const type = path.basename(typeKey.key)
        const config = { type }
        items.forEach(item => {
          config[item.name] = item.value
        })
        return resolve(config)
      })
    })
  }

  configurate() {
    const regKey = new Registry({
      hive: Registry.HKCU,
      key: "\\Software\\Octoblu\\MeshbluConnectors",
    })

    return this.getTypeKeys(regKey).map(typeKey => this.getConnectorKeys(typeKey)).then(flatten).map(item => this.getConnectorConfig(item)).each(config => this.daemonize(config))
  }

  daemonize({ uuid, token, domain, type }) {
    const connectorsPath = this.connectorsPath
    const daemon = new MeshbluConnectorDaemon({ uuid, type, token, domain, connectorsPath })
    return daemon.start()
  }
}

module.exports.MeshbluConnectorConfigurator = MeshbluConnectorConfigurator
