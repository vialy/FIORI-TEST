# Basic Template

## Table Of Contents

**[Introduction](#Introduction)**  
**[Prerequisites](#Prerequisites)**  
**[Development](#Development)**  
**[Testing](#Testing)**  
**[Deployment](#Deployment)**

## Introduction

This application is generated via expressui5 and is the basic Infrabel template. This template contains everything to start with a simple full-screen application.
This template should be used from 2020 onwards, because it uses the new [ui5-tooling](https://github.com/SAP/ui5-tooling) in favor of the legacy grunt-setup.

## Prerequisites

What do you need to have?

- Have admin rights on your computer
- Have installed node and npm on your computer ([link](https://nodejs.org/en/))
- Have the Windows build tools installed on your computer ([link](https://www.npmjs.com/package/windows-build-tools))

## Development

At Infrabel we use Visual Studio Code ([link](https://code.visualstudio.com/)) as our local development environment, so please download and install this editor. In theory you are free to choose whatever editor you want.

When you have cloned this repository to your local file-system you can start developing. But don't forget to install the devDependencies first:

`npm install`

Next up in order to be able to test your applications with a real OData-service is fill in the proxy variables in the .env file. for this you need to copy the .env.example file to a .env file and add values for following variables: PROXY_USERNAME and PROXY_PASSWORD. The values for these variables should be your username and password for the development gateway server (FID). The .env file is added to the gitignore-file, so your username and password aren't visible in the code repository on git.

Please do NOT delete the .env.example file as you are probably not the last developer which will need to work on this application.

### SAPUI5 SDK

In order to test this the applications locally you will need to have a local version of the sapui5 sdk (or runtime). We recommend to keep one version of the sdk on your hard drive in favour of installing the sapui5 sdk for each application due to the size this takes up on your hard drive.

Download the sdk on following [link](https://tools.hana.ondemand.com/#sapui5), be sure to download the SDK because this way you would be able to use the local Fiori Launchpad. Extract the contents of this zip-file to your hard drive and remember the location.

Adjust the ui5.yaml file so that the paths for the sdk reflect your local file system, for example:

```yaml
server:
  customMiddleware:
    - name: ui5-middleware-servestatic
      afterMiddleware: compression
      mountPath: /resources
      configuration:
        rootPath: "C:\\tools\\sapui5-sdk\\1.60.14\\sapui5\\resources"
    - name: ui5-middleware-servestatic
      afterMiddleware: compression
      mountPath: /test-resources
      configuration:
        rootPath: "C:\\tools\\sapui5-sdk\\1.60.14\\sapui5\\test-resources"
```

Don't forget that you need to escape a backslash in Windows!

In case you want to have a project specific SAPUI5 version, then you can use following npm package [sapui5-runtime](https://www.npmjs.com/package/sapui5-runtime), be sure to follow the steps for the [UI5 Tooling](https://www.npmjs.com/package/sapui5-runtime#ui5-tooling-example).

## Testing

When developing the application you can run it locally. There are 2 options:
You can either run the app on node.js by running following command in your terminal:

`npm run start:webapp`

This will boot up a local server for your webapp-folder and will start a livereload task. So when you change something in the code this should be reflected directly in the browser.

## Deployment

In order to be able to deploy your application to the front-end server you need to add values for the following variables: UI5_TASK_NWABAP_DEPLOYER\_\_USER, UI5_TASK_NWABAP_DEPLOYER\_\_PASSWORD, UI5_TASK_NWABAP_DEPLOYER\_\_SERVER. The deployer package will use these to be able to log on to the front-end server.

In the **ui5.yaml** file you will need to add the information in builder part, think about the package, bsp container, and transport number. Transport number can be added to the .env file also with following variable: UI5_TASK_NWABAP_DEPLOYER\_\_TRANSPORTNO

```yaml
builder:
  customTasks:
    - name: ui5-task-nwabap-deployer
      afterTask: generateVersionInfo
      configuration:
        resources:
          path: dist
          pattern: "**/*.*"
        ui5:
          language: EN
          package: PACKAGE
          bspContainer: ZUI5_APP_NAME
          bspContainerText: Description
		  transportNo: TRANSPORT NUMBER
          calculateApplicationIndex: true
```

Once this file is filled in you can run following command to deploy the application to the front-end server:

`npm run sapbuild`
