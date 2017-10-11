// Copyright 2016-2017, Pulumi Corporation.  All rights reserved.

import * as cloud from "@pulumi/cloud";
import * as pulumi from "pulumi";

const config = new pulumi.Config("timers:config");
const message = config.require("message");

cloud.timer.interval("test-interval", { minutes: 1 }, async () => {
    console.log(`test-interval[${Date.now()}]: ${message}`);
});

cloud.timer.cron("test-cron", "* * * * ? *", async () => {
    console.log(`test-cron[${Date.now()}]: ${message}`);
});

cloud.timer.daily("test-daily", { hourUTC: 7, minuteUTC: 30 }, async () => {
    console.log(`test-daily[${Date.now()}]: ${message}`);
});

cloud.timer.hourly("test-hourly", { minuteUTC: 45 }, async () => {
    console.log(`test-hourly[${Date.now()}]: ${message}`);
});
