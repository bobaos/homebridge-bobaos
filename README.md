# homebridge-bobaos

## Installation

First of all, make sure that [homebridge](https://github.com/nfarina/homebridge) is installed. Then proceed to steps below. 

Install plugin package:
```
sudo npm install -g homebridge-bobaos
```

Add platform "Bobaos" to config.json file:

```
{
  "bridge": {
    "name": "....",
    ....
  },
    "platforms": [
      {
        "platform" "Bobaos",
        "accessories": []
      }
    ]
}
```

## Configuration

The more convenient and simple way than edit config.json file directly is to write it in yml format. It may look like followinng example:

```
accessories:
  - name: Livroom lights
    services:
      - type: Lightbulb
        name: Livroom lights
        characteristics:
          - type: On
            control: 1
            status: 2
  - name: Kitchen lights
    services:
      - type: Lightbulb
        name: Kitchen lights
        characteristics:
          - type: On
            control: 3
            status: 4
          - type: Brightness
            control: 5
            status: 6

```

In this npm package I provide with simple utility ```genBobaosAccessories``` which serves to generate json configuration.

Usage:
```
genBobaosAccessories config.yml existingConfig.json > newConfig.json
```

Config.yml should contains "accessory" section like in example above. Existing config.json may contains platform "Bobaos" in platform list or may not. If it contains then script will replace just "accessory" section for this platform, if not then it will create and push new platform information to json. 

## Credits

