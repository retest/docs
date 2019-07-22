# Using review behind a proxy

If your client runs behind a corporate [**proxy**](https://en.wikipedia.org/wiki/Proxy_server), additional configuration steps are required for a smooth user experience. If Oracle JDK on Windows or Mac is used, please refer to the corresponding [**documentation**](https://www.java.com/en/download/help/proxy_setup.xml).

If that doesn't work, it is always possible to configure proxies specifically for review. Each copy of review is shipped with a default configuration file named `retest.properties`. To setup proxy configuration open this file with an text editor and change the entries under **Proxy Settings** accordingly:

## Configuration parameters

* `de.retest.internet.proxy.useSystemProxies`: Please try setting this property to `true` first. If that doesn't work, continue with the other configuration settings.
* `de.retest.internet.proxy.address` and `de.retest.internet.proxy.port`: If your proxy **doesn't** require authentication, please set these accordingly.
* `de.retest.internet.proxy.username` and `de.retest.internet.proxy.password`: If your proxy **does** require authentication, please set these accordingly.

If none of these work, it may be needed to import your proxy root certificate into the java keystore. Please refer to e.g. this [**documentation**](https://knowledge.digicert.com/solution/SO4085.html) or ask your local network administrator.
