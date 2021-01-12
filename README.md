# react-native-boilerplate

Boilerplate for creating mobile apps with react native

## Background

> Creating a good mobile apps takes forever, especially if you are starting off from scratch. So, I decided to make a few templates to help me speed up things a little bit.

## Installation

Open your terminal and type in

```sh
$ git clone https://github.com/indrapuji/react-native-boilerplate.git
$ cd mobile
$ yarn install
$ npx pod-install
```

## Scaffolding

```text
mobile
├── android
├── ios
├── src
│   └── assets
│   └── module
|       └── splash
│           ├── assets
│           │   └── styles.js
│           └── screen
│               └── Splash.Screen.js
└── README.md
```

## How to use

#### making new screen

- Create a folder under module to create new screen file.

#### using import

- use absolute path

**usualy**

```
import styles from '../assets/styles'
```

**with absolute path / alias**

```
import styles from '@module/splash/assets/styles';
```

path that use alias

```
assets ===> '@assets'
module ===> '@module'
```

## Dependencies

- include React native vector icons
- babel plugin module resolver

## Author

- [**Indra Puji Novirwan**](https://github.com/indrapuji) [![GitHub followers](https://img.shields.io/github/followers/indrapuji.svg?style=social)](https://github.com/indrapuji)

## License

Copyright (c) 2020 Indra Puji Novirwan.
# field-service-app
