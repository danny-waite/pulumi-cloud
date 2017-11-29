// Copyright 2016-2017, Pulumi Corporation.  All rights reserved.

import * as cloud from "@pulumi/cloud";
import * as supertest from "supertest";

import * as harness from "./harness";
import * as httpEndpointTests from "./httpEndpointTests";
import * as tableTests from "./tableTests";

const endpoint = new cloud.HttpEndpoint("tests-unittests");

const testFunctions = [tableTests.runAllTests, httpEndpointTests.runAllTests];
// const testFunctions = [httpEndpointTests.runAllTests];

endpoint.get("/unittests", async (req, res) => {
    await harness.testModules(res, testFunctions);
});

const deployment = endpoint.publish();
deployment.url.then(u => console.log("Serving at: " + u));