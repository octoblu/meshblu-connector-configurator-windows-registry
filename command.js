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
    env: "PM2_HOME",
    help: "Base location of meshblu-connector-pm2",
    helpArg: "PATH",
    completionType: "file",
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

  async run() {
    const options = this.octoDash.parseOptions()
    const { connectorHome, pm2Home } = options
    const configurator = new MeshbluConnectorConfigurator({ connectorHome, pm2Home })
    try {
      await configurator.configurate()
    } catch (error) {
      this.octoDash.die(error)
    }
    // process.exit(0)
  }
}

const command = new MeshbluConnectorConfiguratorCommand({ argv: process.argv })
command.run().catch(error => {
  console.error(error)
})
