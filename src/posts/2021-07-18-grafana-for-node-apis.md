---
date: 2021-07-18T17:00:00.00-05:00
title: Visualizing Node.js Rest API Metrics with Grafana
description:
  Walking through an example Grafana dashboard that monitors a Node.js REST API.
permalink: 2021-grafana-for-node-apis/
tags:
  - node.js
  - API
  - Grafana
---

Metrics are great when you're trying to understand the behavior of a running
system, whether it be a bare metal computer system, a virtual machine, a Docker
container, or an application within that container. Measuring and collecting
metrics gives you the data you need to make sense of what's going on, but by
itself it can be difficult to see the big picture.

Enter Grafana. On the front page of
[grafana.com/grafana](http://grafana.com/grafana), there’s a nice description.

> Grafana allows you to query, visualize, alert on, and understand your metrics
> no matter where they are stored. Create, explore, and share dashboards with
> your team and foster a data-driven culture.

To me, Grafana is primarily a visualization tool. It allows you to hook a
metrics datasource to it, and use that data to create graphs, charts,
histograms, and other visualizations from those metrics. These visualizations
provide the big picture view needed to help you see trends and draw conclusions
in otherwise opaque data.

Today I want to walk you through a use-case I recently had for Grafana: building
a dashboard to monitor a recently deployed Node.js REST API.

## Host Metrics

When building a Node.js web app, my philosophy is to deploy early and often. One
of the first things I do after the initial boilerplate of my app is secure a
deployment environment for it. In this case, it was a set of 3 VMs on some
hypervisors in my company's datacenter. Once my application is deployed, I set
up an initial Grafana dashboard to monitor some basic metrics about the health
of those VMs - cpu, memory, disk - all scraped by Prometheus from the
node_exporter application and ingested into Grafana. Other tenants are on these
VMs, so I split out a separate display to indicate my specific containers' cpu
and memory usage, to quickly highlight any disparities. And since I've been
bitten by running out of inodes on a system before, it's a habit to also monitor
those separately from disk usage.

<img class="rounded-lg" alt="a picture of the virtual machine metrics Grafana panel" src="/images/grafana-for-node-image-1589945223152.png" />

## Application Metrics

Later, when my application is doing interesting things, I start instrumenting
downstream API calls so that I can get a sense for the health of these
dependencies and how they are affecting my overall request latency. To add this
instrumentation, I use the prom-client Node.js library available on NPM to
expose a custom metrics route on my application. Once the instrumentation is
deployed to production, I create a second set of panels to visualize the health
of these dependencies. On the far left I have a single graph with multiple line
charts overlaid, representing the frequency of different response codes for each
dependency. This helps me see any spikes in errors, for example. To the right of
that are response time histograms showing the distribution of response times for
each dependency. This gives me a sense of how fast (or slow) each downstream API
is responding to the requests I'm making.

<img class="rounded-lg" alt="a picture of the dependency health metrics Grafana panel" src="/images/grafana-for-node-image-1589945316423.png" />

Of course at this point I'm also interested in seeing what my users are seeing,
so I add some additional graphs to display the outgoing response code frequency,
response times, and response code counts. I collect these metrics using the
swagger-stats Node.js library, which I hook into my express-openapi -driven web
application. I also add a display for some additional "sanity check" metrics I
add to the application to ensure I’m not exceeding any limits imposed by a
downstream service provider. In this case, Twilio.

<img class="rounded-lg" alt="a picture of the application metrics Grafana panel" src="/images/grafana-for-node-image-1589945955281.png" />

## Annotations

At the top of the Grafana UI is a menu that allows me to zoom out to view a
larger window of metrics. If I expand out to 14 days, you can see a purple line
going down some of my graphs. This is called an "annotation", and it allows you
to overlay key "events" to help correlate those events with changes in overall
metrics. In this case, my "annotation" is indicating a deployment of my
application.

<img class="rounded-lg" alt="a picture of an annotation on a Grafana panel" src="/images/grafana-for-node-image-1589946070261.png" />

## Pulling It All Together

Finally, after my application is live, and I am interested in some higher-level
metrics, I tie in some metrics collected from my HAProxy load balancers to get a
picture of how they see the health of my application. These graphs ended up
mostly the same, but they highlighted some outliers that triggered us to look
closer and ultimately improve the logging at that level in our stack.

<img class="rounded-lg" alt="a picture of the load balancer metrics Grafana panel" src="/images/grafana-for-node-image-1589946254586.png" />

Putting it all together on a single dashboard gives us a comprehensive picture
of the health of our application. This, combined with Airbrake error reporting
software, our Prometheus alerts, and our logstash log aggregation, gives us a
comprehensive view into the health of our API.

<img class="rounded-lg" alt="a picture of the full Grafana panel" src="/images/grafana-for-node-image-1589946649463.png" />
