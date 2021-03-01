REST API using NodeJS
============
[![Docker Build Status](https://img.shields.io/docker/cloud/build/ananthrs/hello-node)](https://hub.docker.com/repository/docker/ananthrs/hello-node/builds) [![Swagger API Spec](https://img.shields.io/swagger/valid/3.0?specUrl=https%3A%2F%2Fraw.githubusercontent.com%2Fananth-racherla%2Fhello-nodejs%2Fmain%2Fspec%2Fapi.yaml)](https://app.swaggerhub.com/apis-docs/ananthr/product/1.0.0) [![Current Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/ananth-racherla/hello-nodejs) [![License](https://img.shields.io/github/license/ananth-racherla/hello-nodejs)](LICENSE)

Reference Implementation for a REST API in Node.js.

# Summary
This repo contains a REST API implementation written in Node.js/Javascript.  The API conforms to Open API Spec 3.0.3 and can be viewed [here](https://app.swaggerhub.com/apis-docs/ananthr/product/1.0.0).

The application uses a three tier architecture.  The route actions invoke business logic defined in separate service layers. An npm package dependency called `mongoose` is used to define database models.

## Project Structure
```
├── Dockerfile        # Container build configuration
├── helm
│   └── hello-node    # Kubernetes helm chart
├── package.json      # source dependencies
├── skaffold.yaml     # Workflow configuration for building, pushing and deploying the application
├── spec
│   └── api.yaml      # OpenAPI 3.0 Spec for this project
├── src
│   ├── api           # Application entry point
│   ├── bootstrap     # Startup modules
│   ├── config        # App configuration modules
│   ├── index.js      # Application entry point
│   ├── models        # Database models
│   └── services      # Business layer
└── test
    └── k6            # Load test scripts
```

## Highlights
1. Features automated docker builds for commits to the main branch.
2. Includes self sufficient helm package that includes both the main app deployment and also a mongo installation for ease of testing.
3. The included Open API spec makes it possible to generate client libraries, API gateway definitions and even load test scripts. [test/k6](test/k6) folder contains a generated load test script.
4. Includes Skaffold configuration that provides building blocks for a CI/CD pipeline.
5. Includes application metrics through the use of a Prometheus middleware component. Metrics endpoint exposed at `/metrics`.
6. Sensitive user information is encrypted at rest in the backend mongo store.

# Getting started

## Local builds
```
# Create .env file and specify mongodb connection string.
npm install
npm start
```
Navigate to http://localhost:3000 in a browser window or use curl to invoke APIs.

## Docker build

```
docker build . -t hello-node:latest
docker run -p 3000:3000 --env-file=.env hello-node:latest
```

## Kubernetes
```
# This will install the app and a mongo database in a standalone mode 
# to the cluster pointed to by the current context
helm upgrade --install hello-node-release ./helm/hello-node
```
If cluster has an ingress controller, then access the site at http://hello-node.localhost/ . Ensure that you have a hosts file entry that maps `hello-node.localhost` to `127.0.0.1`

## Skaffold
Skaffold provides a convienient way to build the app container and deploy helm chart
```
# To build and deploy the app once, similar to a CI/CD pipeline
skaffold run

# Alternatively to build and deploy your app every time the code changes
skaffold dev
```

## Load Testing
The project includes k6 load test scripts that were auto-generated using the Open API spec. The tests as checked in target a mock API server running on swaggerhub.com.
To run the script ensure you have [k6 installed](https://k6.io/docs/getting-started/installation)
```
k6 run test/k6/script.js


          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: script.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m00.9s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.9s/10m0s  1/1 iters, 1 per VU

     █ /beta/register

       ✓ registeration successful

     █ /beta/getUserList

       ✓ success

     █ /healthz

       ✓ Healthy

     checks.....................: 100.00% ✓ 3 ✗ 0
     data_received..............: 6.7 kB  7.3 kB/s
     data_sent..................: 1.1 kB  1.2 kB/s
     group_duration.............: avg=300.1ms  min=185.22ms med=185.67ms max=529.4ms  p(90)=460.66ms p(95)=495.03ms
     http_req_blocked...........: avg=113.53ms min=3.4µs    med=3.6µs    max=340.61ms p(90)=272.48ms p(95)=306.54ms
     http_req_connecting........: avg=26.51ms  min=0s       med=0s       max=79.53ms  p(90)=63.62ms  p(95)=71.58ms 
     http_req_duration..........: avg=86.24ms  min=84.95ms  med=85.4ms   max=88.37ms  p(90)=87.77ms  p(95)=88.07ms 
     http_req_receiving.........: avg=52.06µs  min=50.4µs   med=51.8µs   max=54µs     p(90)=53.56µs  p(95)=53.78µs 
     http_req_sending...........: avg=45.96µs  min=27.5µs   med=28.1µs   max=82.3µs   p(90)=71.46µs  p(95)=76.88µs 
     http_req_tls_handshaking...: avg=62.76ms  min=0s       med=0s       max=188.28ms p(90)=150.62ms p(95)=169.45ms
     http_req_waiting...........: avg=86.14ms  min=84.87ms  med=85.32ms  max=88.23ms  p(90)=87.65ms  p(95)=87.94ms 
     http_reqs..................: 3       3.266371/s
     iteration_duration.........: avg=900.47ms min=900.47ms med=900.47ms max=900.47ms p(90)=900.47ms p(95)=900.47ms
     iterations.................: 1       1.08879/s
```

# Future roadmap
1. Embrace typescript for build time type-safety.
2. Program to interface and use dependency injection to manage project dependencies
3. Add unit testing framework
4. Add js linting support
5. Separate out Mongo dependencies into a generic repository layer
6. Add grafana dashboards for visualizing application metrics
7. Use a logging framework 
8. Add JSDoc integration

## License
This project is licensed under the terms of the [MIT license](https://github.com/ananth-racherla/hello-nodejs/blob/main/LICENSE).

# References
1. [Bulletproof node.js project architecture](https://softwareontheroad.com/ideal-nodejs-project-structure/)
