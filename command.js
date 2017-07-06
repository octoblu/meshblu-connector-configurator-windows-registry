#!/usr/bin/env node
const OctoDash = require("octodash")
const packageJSON = require("./package.json")
const { MeshbluConnectorConfigurator } = require("./lib/configurator")

const CLI_OPTIONS = [
  {
    names: ["connector-home"],
    type: "string",
    required: true,
    env: "MESHBLU_CONNECTOR_HOME",
    help: "Base location of meshblu connectors",
    helpArg: "PATH",
    completionType: "file",
  },
  {
    names: ["pm2-home"],
    type: "string",
    required: true,
    env: "MESHBLU_CONNECTOR_PM2_HOME",
    help: "Base location of meshblu-connector-pm2",
    helpArg: "PATH",
    completionType: "file",
  },
  {
    names: ["root-key"],
    type: "string",
    required: true,
    env: "MESHBLU_CONNECTOR_ROOT_KEY",
    help: "Root Key alias [HKLM, HKCU]",
    helpArg: "ROOT",
    default: "HKCU",
  },
]

class MeshbluConnectorConfiguratorCommand {
  constructor({ argv, cliOptions = CLI_OPTIONS } = {}) {
    this.octoDash = new OctoDash({
      argv,
      cliOptions,
      name: packageJSON.name,
      version: packageJSON.version,
    })
  }

  run() {
    const options = this.octoDash.parseOptions()
    const { connectorHome, pm2Home, rootKey } = options
    const configurator = new MeshbluConnectorConfigurator({ connectorHome, pm2Home, rootKey })
    return configurator.configurate()
  }

  die(error) {
    this.octoDash.die(error)
  }
}

const command = new MeshbluConnectorConfiguratorCommand({ argv: process.argv })
command
  .run()
  .catch(error => {
    command.die(error)
  })
  .then(() => {
    process.exit(0)
  })
