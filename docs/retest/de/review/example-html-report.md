# Beispiel HTML-Report

Beim [Ausführen einer Suite](../replay/suite-ausfuehren.md) kann auch ein HTML-Report erzeugt werden, welcher dann z. B. von
einem [CI-Server](../testprozess/prozess-mit-ci-server.md) aus direkt geladen werden kann. Möglicherweise gibt es hierbei
Probleme, da die meisten CI-Server sehr restriktiv bei der Auslieferung (externer) dynamischer Inhalte sind. Bei Jenkins etwa,
kann dies über die Umgebungsvariable [`hudson.model.DirectoryBrowserSupport.CSP`](https://wiki.jenkins.io/display/JENKINS/Configuring+Content+Security+Policy)
angepasst werden. Falls Sie diese Einstellungen nicht ändern möchten oder können, so bleibt Ihnen immer noch der Download des
HTML-Reports, um diesen dann lokal zu betrachten.

Ein Beispiel für einen solchen HTML-Bericht finden Sie [hier](example-html-report).

